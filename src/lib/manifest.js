const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_MANIFEST_PATH = "templates/manifest.json";

function resolveRepositoryPath(repoValue = ".") {
  return path.resolve(process.cwd(), repoValue || ".");
}

function resolveManifestPath(repoPath, manifestValue = DEFAULT_MANIFEST_PATH) {
  if (path.isAbsolute(manifestValue)) {
    return manifestValue;
  }

  return path.resolve(repoPath, manifestValue || DEFAULT_MANIFEST_PATH);
}

function readJsonFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${label} file not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`${label} JSON parse failed: ${error.message}`);
  }
}

function validateManifest(manifest) {
  const errors = [];

  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    return ["manifest root must be an object"];
  }

  for (const field of ["schemaVersion", "frameworkVersion", "release", "versionState", "files"]) {
    if (!(field in manifest)) {
      errors.push(`missing required field: ${field}`);
    }
  }

  if (manifest.release && typeof manifest.release !== "object") {
    errors.push("release must be an object");
  }

  if (manifest.versionState && typeof manifest.versionState !== "object") {
    errors.push("versionState must be an object");
  }

  if (!Array.isArray(manifest.files)) {
    errors.push("files must be an array");
  } else {
    manifest.files.forEach((file, index) => {
      for (const field of ["source", "target", "kind", "updatePolicy"]) {
        if (!file || typeof file !== "object" || !file[field]) {
          errors.push(`files[${index}] missing required field: ${field}`);
        }
      }
    });
  }

  if (manifest.versionState && !manifest.versionState.targetPath) {
    errors.push("versionState.targetPath is required");
  }

  return errors;
}

function loadManifest({ repoPath, manifestPath }) {
  const absoluteRepoPath = resolveRepositoryPath(repoPath);
  const absoluteManifestPath = resolveManifestPath(absoluteRepoPath, manifestPath);
  const manifest = readJsonFile(absoluteManifestPath, "Manifest");
  const errors = validateManifest(manifest);

  if (errors.length > 0) {
    throw new Error(`Invalid manifest: ${errors.join("; ")}`);
  }

  return {
    manifest,
    manifestPath: absoluteManifestPath,
    repoPath: absoluteRepoPath
  };
}

function getTargetRelease(manifest, requestedRelease) {
  return requestedRelease || manifest.release.plannedTag || `v${manifest.frameworkVersion}`;
}

function summarizeByField(items, field) {
  return items.reduce((counts, item) => {
    const key = item[field] || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function describeCounts(counts) {
  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return "none";
  }

  return entries.map(([key, value]) => `${key}=${value}`).join(", ");
}

function getTargetStatuses(repoPath, manifest) {
  return manifest.files.map((file) => {
    const targetPath = path.resolve(repoPath, file.target);
    const sourcePath = path.resolve(repoPath, file.source);
    let targetStatus = "missing";
    let sourceStatus = "missing";
    let isSymlink = false;
    let symlinkTarget = null;

    try {
      const targetStat = fs.lstatSync(targetPath);
      targetStatus = "exists";
      isSymlink = targetStat.isSymbolicLink();
      if (isSymlink) {
        symlinkTarget = fs.readlinkSync(targetPath);
      }
    } catch (error) {
      if (error.code !== "ENOENT") {
        targetStatus = `error:${error.code}`;
      }
    }

    try {
      fs.lstatSync(sourcePath);
      sourceStatus = "exists";
    } catch (error) {
      if (error.code !== "ENOENT") {
        sourceStatus = `error:${error.code}`;
      }
    }

    return {
      ...file,
      isSymlink,
      sourcePath,
      sourceStatus,
      symlinkTarget,
      targetPath,
      targetStatus
    };
  });
}

function summarizeManifest(repoPath, manifest) {
  const statuses = getTargetStatuses(repoPath, manifest);

  return {
    byKind: summarizeByField(manifest.files, "kind"),
    byPolicy: summarizeByField(manifest.files, "updatePolicy"),
    targetStatuses: summarizeByField(statuses, "targetStatus"),
    sourceStatuses: summarizeByField(statuses, "sourceStatus"),
    statuses,
    total: manifest.files.length
  };
}

function formatPathItems(items, limit = 8) {
  if (items.length === 0) {
    return ["없음"];
  }

  const visible = items.slice(0, limit).map((item) => {
    return `${item.target} (${item.updatePolicy})`;
  });

  const remaining = items.length - visible.length;
  if (remaining > 0) {
    visible.push(`...and ${remaining} more`);
  }

  return visible;
}

function classifyInitCandidates(summary) {
  const existingTargets = summary.statuses.filter((item) => item.targetStatus === "exists");
  const missingTargets = summary.statuses.filter((item) => item.targetStatus === "missing");

  return {
    existingTargets,
    missingTargets
  };
}

function classifyUpdateCandidates(summary) {
  const automaticCandidates = summary.statuses.filter((item) => {
    return item.updatePolicy === "overwrite" && item.targetStatus === "missing";
  });
  const manualCandidates = summary.statuses.filter((item) => {
    return ["merge", "manual", "preserve", "symlink"].includes(item.updatePolicy);
  });
  const conflictCandidates = summary.statuses.filter((item) => {
    return item.targetStatus === "exists" && ["merge", "overwrite", "symlink"].includes(item.updatePolicy);
  });
  const deferredCandidates = summary.statuses.filter((item) => {
    return item.sourceStatus !== "exists";
  });

  return {
    automaticCandidates,
    conflictCandidates,
    deferredCandidates,
    manualCandidates
  };
}

module.exports = {
  DEFAULT_MANIFEST_PATH,
  classifyInitCandidates,
  classifyUpdateCandidates,
  describeCounts,
  formatPathItems,
  getTargetRelease,
  loadManifest,
  resolveManifestPath,
  resolveRepositoryPath,
  summarizeManifest
};
