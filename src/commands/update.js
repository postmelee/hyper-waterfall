const path = require("node:path");
const {
  classifyUpdateCandidates,
  describeCounts,
  formatPathItems,
  getTargetRelease,
  loadManifest,
  summarizeManifest
} = require("../lib/manifest");
const { parseOptions, renderCommandHelp, renderLifecycleReport } = require("../lib/output");
const { formatCurrentVersion, readVersionState } = require("../lib/version-state");

const name = "update";
const summary = "Prepare an existing repository update dry-run.";
const options = [
  ["--repo <path>", "Target repository path. Defaults to the current directory."],
  ["--manifest <path>", "Target release manifest path."],
  ["--from <tag>", "Current Hyper-Waterfall release or baseline."],
  ["--to <tag>", "Target Hyper-Waterfall release or tag."],
  ["--dry-run", "Print update candidates without writing files."]
];

function help() {
  return renderCommandHelp({
    name,
    summary,
    usage: "hyper-waterfall update [--repo <path>] [--manifest <path>] [--from <tag>] [--to <tag>] [--dry-run]",
    options,
    description: [
      "Prints the update checkpoint before any repository files are changed.",
      "Reads manifest and version-state details, then shows update candidates."
    ]
  });
}

function normalizeTag(tag) {
  if (!tag || tag === "unknown") {
    return "unknown";
  }

  return tag.startsWith("v") ? tag : `v${tag}`;
}

function getMigrationGuide(repoPath, fromTag, toTag) {
  const normalizedFrom = normalizeTag(fromTag);
  const normalizedTo = normalizeTag(toTag);

  if (normalizedFrom === "unknown" || normalizedTo === "unknown") {
    return {
      exists: false,
      path: "unknown"
    };
  }

  const migrationPath = path.resolve(
    repoPath,
    "docs",
    "migrations",
    `${normalizedFrom}-to-${normalizedTo}.md`
  );

  return {
    exists: require("node:fs").existsSync(migrationPath),
    path: migrationPath
  };
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
    const summaryResult = summarizeManifest(loaded.repoPath, loaded.manifest);
    const candidates = classifyUpdateCandidates(summaryResult);
    const versionState = readVersionState(
      loaded.repoPath,
      loaded.manifest.versionState.targetPath
    );
    const fromVersion = parsed.values["--from"]
      || (versionState.data && (versionState.data.releaseTag || versionState.data.frameworkVersion))
      || loaded.manifest.release.baselineTag
      || "unknown";
    const targetRelease = getTargetRelease(loaded.manifest, parsed.values["--to"]);
    const migrationGuide = getMigrationGuide(loaded.repoPath, fromVersion, targetRelease);
    const deferredItems = candidates.deferredCandidates.length > 0
      ? formatPathItems(candidates.deferredCandidates)
      : [];

    io.stdout.write(`${renderLifecycleReport({
      title: "기존 업데이트 판단 결과",
      sections: [
        {
          title: "대상 저장소",
          entries: [
            ["path", loaded.repoPath],
            ["manifest", loaded.manifestPath]
          ]
        },
        {
          title: "현재 version",
          entries: [
            ["versionState", formatCurrentVersion(versionState)],
            ["from", fromVersion]
          ]
        },
        {
          title: "목표 release/tag",
          entries: [
            ["to", targetRelease],
            ["frameworkVersion", loaded.manifest.frameworkVersion]
          ]
        },
        {
          title: "migration guide",
          entries: [
            ["path", migrationGuide.path],
            ["exists", migrationGuide.exists ? "yes" : "no"]
          ]
        },
        {
          title: "manifest diff",
          entries: [
            ["mode", "MVP target-status and update-policy summary"],
            ["total", summaryResult.total],
            ["updatePolicy", describeCounts(summaryResult.byPolicy)],
            ["targetStatus", describeCounts(summaryResult.targetStatuses)]
          ]
        },
        {
          title: "자동 적용 가능",
          items: formatPathItems(candidates.automaticCandidates)
        },
        {
          title: "수동 확인 필요",
          items: formatPathItems(candidates.manualCandidates)
        },
        {
          title: "conflict",
          items: formatPathItems(candidates.conflictCandidates)
        },
        {
          title: "보류",
          items: [
            ...deferredItems,
            "실제 파일 적용, PR 생성, npm publish는 승인 후 별도 절차에서 수행"
          ]
        },
        {
          title: "승인 요청",
          items: [
            "Hyper-Waterfall 버전 업데이트 PR 후보를 만들지 검토한다.",
            "자동 적용 가능 항목도 checksum 확정 전에는 적용하지 않는다.",
            "수동 확인 필요와 conflict 항목은 일반 task workflow에서 리뷰한다."
          ]
        }
      ]
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
