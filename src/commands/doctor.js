const fs = require("node:fs");
const path = require("node:path");
const {
  describeCounts,
  loadManifest,
  summarizeManifest
} = require("../lib/manifest");
const { parseOptions, renderCommandHelp, renderDiagnosticReport } = require("../lib/output");
const { formatCurrentVersion, readVersionState } = require("../lib/version-state");

const name = "doctor";
const summary = "Diagnose framework lifecycle files without modifying them.";
const options = [
  ["--repo <path>", "Target repository path. Defaults to the current directory."],
  ["--manifest <path>", "Framework manifest path. Defaults to templates/manifest.json."]
];

function help() {
  return renderCommandHelp({
    name,
    summary,
    usage: "hyper-waterfall doctor [--repo <path>] [--manifest <path>]",
    options,
    description: [
      "Checks lifecycle inputs without changing files.",
      "Reports version, target, symlink, and template diagnostics."
    ]
  });
}

function addDiagnostic(diagnostics, level, scope, message) {
  diagnostics.push({ level, scope, message });
}

function buildVersionDiagnostics(diagnostics, manifest, versionState) {
  if (!versionState.exists) {
    addDiagnostic(
      diagnostics,
      "WARN",
      "version-state",
      `${manifest.versionState.targetPath} is missing; init/update should create it only after approval.`
    );
    return;
  }

  if (versionState.error) {
    addDiagnostic(
      diagnostics,
      "ERROR",
      "version-state",
      `${manifest.versionState.targetPath} JSON parse failed: ${versionState.error}`
    );
    return;
  }

  const expectedVersion = manifest.frameworkVersion;
  const actualVersion = versionState.data.frameworkVersion || "unknown";
  const level = actualVersion === expectedVersion ? "OK" : "WARN";

  addDiagnostic(
    diagnostics,
    level,
    "version-state",
    `${formatCurrentVersion(versionState)}; expected frameworkVersion ${expectedVersion}`
  );
}

function buildManifestPathDiagnostics(diagnostics, summary) {
  const missingSources = summary.statuses.filter((item) => item.sourceStatus !== "exists");
  const missingTargets = summary.statuses.filter((item) => item.targetStatus !== "exists");

  if (missingSources.length === 0) {
    addDiagnostic(diagnostics, "OK", "manifest-source", "all manifest source paths exist");
  } else {
    for (const item of missingSources.slice(0, 8)) {
      addDiagnostic(
        diagnostics,
        "ERROR",
        "manifest-source",
        `${item.source} source status is ${item.sourceStatus}`
      );
    }
  }

  if (missingTargets.length === 0) {
    addDiagnostic(diagnostics, "OK", "manifest-target", "all manifest target paths exist");
  } else {
    addDiagnostic(
      diagnostics,
      "WARN",
      "manifest-target",
      `${missingTargets.length} target paths are missing or unreadable; review before applying changes`
    );
    for (const item of missingTargets.slice(0, 8)) {
      addDiagnostic(
        diagnostics,
        "INFO",
        "manifest-target",
        `${item.target} target status is ${item.targetStatus} (${item.updatePolicy})`
      );
    }
  }
}

function buildSymlinkDiagnostics(diagnostics, summary) {
  const symlinks = summary.statuses.filter((item) => item.kind === "symlink");

  if (symlinks.length === 0) {
    addDiagnostic(diagnostics, "INFO", "symlink", "manifest has no symlink entries");
    return;
  }

  for (const item of symlinks) {
    if (item.targetStatus !== "exists") {
      addDiagnostic(
        diagnostics,
        "WARN",
        "symlink",
        `${item.target} is missing; expected symlink toward ${item.source}`
      );
      continue;
    }

    if (!item.isSymlink) {
      addDiagnostic(
        diagnostics,
        "ERROR",
        "symlink",
        `${item.target} exists but is not a symlink`
      );
      continue;
    }

    addDiagnostic(
      diagnostics,
      "OK",
      "symlink",
      `${item.target} -> ${item.symlinkTarget}`
    );
  }
}

function readTextIfFile(filePath) {
  try {
    const stat = fs.lstatSync(filePath);
    if (!stat.isFile()) {
      return null;
    }
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return null;
  }
}

function buildPlaceholderDiagnostics(diagnostics, repoPath) {
  const checks = [
    {
      file: "templates/AGENTS.md",
      placeholders: ["{PROJECT_OVERVIEW}", "{PROJECT_SPECIFIC_RULES}", "{PROJECT_SPECIFIC_REQUIRED_DOCUMENTS}", "{BASE_BRANCH}"]
    },
    {
      file: "templates/.github/pull_request_template.md",
      placeholders: ["{REPO_SLUG}"]
    }
  ];

  for (const check of checks) {
    const filePath = path.resolve(repoPath, check.file);
    const text = readTextIfFile(filePath);

    if (text === null) {
      addDiagnostic(diagnostics, "WARN", "placeholder", `${check.file} is not readable`);
      continue;
    }

    const missing = check.placeholders.filter((placeholder) => !text.includes(placeholder));
    if (missing.length === 0) {
      addDiagnostic(diagnostics, "OK", "placeholder", `${check.file} preserves required placeholders`);
    } else {
      addDiagnostic(
        diagnostics,
        "WARN",
        "placeholder",
        `${check.file} missing placeholders: ${missing.join(", ")}`
      );
    }
  }
}

function run(args, io) {
  const parsed = parseOptions(args, options);

  if (parsed.help) {
    io.stdout.write(`${help()}\n`);
    return 0;
  }

  if (parsed.error) {
    io.stderr.write(`${parsed.error}\n`);
    return 1;
  }

  try {
    const repoPath = parsed.values["--repo"] || ".";
    const manifestPath = parsed.values["--manifest"];
    const loaded = loadManifest({ repoPath, manifestPath });
    const summary = summarizeManifest(loaded.repoPath, loaded.manifest);
    const versionState = readVersionState(
      loaded.repoPath,
      loaded.manifest.versionState.targetPath
    );
    const diagnostics = [];

    addDiagnostic(
      diagnostics,
      "OK",
      "manifest",
      `loaded ${loaded.manifestPath} for frameworkVersion ${loaded.manifest.frameworkVersion}`
    );
    buildVersionDiagnostics(diagnostics, loaded.manifest, versionState);
    buildManifestPathDiagnostics(diagnostics, summary);
    buildSymlinkDiagnostics(diagnostics, summary);
    buildPlaceholderDiagnostics(diagnostics, loaded.repoPath);
    addDiagnostic(
      diagnostics,
      "INFO",
      "next-action",
      "doctor only reports findings; apply changes after approval through the task workflow"
    );

    io.stdout.write(`${renderDiagnosticReport({
      title: "doctor 진단 결과",
      summary: [
        ["repo", loaded.repoPath],
        ["manifest", loaded.manifestPath],
        ["frameworkVersion", loaded.manifest.frameworkVersion],
        ["files", summary.total],
        ["sourceStatus", describeCounts(summary.sourceStatuses)],
        ["targetStatus", describeCounts(summary.targetStatuses)]
      ],
      diagnostics
    })}\n`);
    return 0;
  } catch (error) {
    io.stderr.write(`${error.message}\n`);
    return 1;
  }
}

module.exports = {
  help,
  name,
  run,
  summary
};
