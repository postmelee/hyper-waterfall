const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_VERSION_STATE_PATH = ".hyper-waterfall/version.json";

function readVersionState(repoPath, targetPath = DEFAULT_VERSION_STATE_PATH) {
  const versionPath = path.resolve(repoPath, targetPath || DEFAULT_VERSION_STATE_PATH);

  if (!fs.existsSync(versionPath)) {
    return {
      exists: false,
      path: versionPath
    };
  }

  const raw = fs.readFileSync(versionPath, "utf8");

  try {
    const data = JSON.parse(raw);

    return {
      data,
      exists: true,
      path: versionPath
    };
  } catch (error) {
    return {
      error: error.message,
      exists: true,
      path: versionPath
    };
  }
}

function formatCurrentVersion(versionState) {
  if (!versionState.exists) {
    return `없음 (${versionState.path})`;
  }

  if (versionState.error) {
    return `파싱 실패 (${versionState.error})`;
  }

  const data = versionState.data;
  const version = data.frameworkVersion || "unknown";
  const release = data.releaseTag || data.release || "unknown";
  const updatedAt = data.updatedAt || data.installedAt || "unknown";

  return `${version} / ${release} / ${updatedAt}`;
}

module.exports = {
  DEFAULT_VERSION_STATE_PATH,
  formatCurrentVersion,
  readVersionState
};
