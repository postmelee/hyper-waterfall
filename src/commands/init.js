const {
  classifyInitCandidates,
  describeCounts,
  formatPathItems,
  getTargetRelease,
  loadManifest,
  summarizeManifest
} = require("../lib/manifest");
const { parseOptions, renderCommandHelp, renderLifecycleReport } = require("../lib/output");
const { readVersionState } = require("../lib/version-state");

const name = "init";
const summary = "Prepare a new repository adoption dry-run.";
const options = [
  ["--repo <path>", "Target repository path. Defaults to the current directory."],
  ["--manifest <path>", "Framework manifest path. Defaults to repo templates/manifest.json, then bundled manifest."],
  ["--target-release <tag>", "Target Hyper-Waterfall release or tag."],
  ["--dry-run", "Print the adoption plan without writing files."]
];

function help() {
  return renderCommandHelp({
    name,
    summary,
    usage: "hyper-waterfall init [--repo <path>] [--manifest <path>] [--target-release <tag>] [--dry-run]",
    options,
    description: [
      "Prints the new-adoption checkpoint before any repository files are changed.",
      "Reads the manifest and shows adoption candidates, conflicts, and approval requests."
    ]
  });
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
    const candidates = classifyInitCandidates(summaryResult);
    const targetRelease = getTargetRelease(loaded.manifest, parsed.values["--target-release"]);
    const versionState = readVersionState(
      loaded.repoPath,
      loaded.manifest.versionState.targetPath
    );

    io.stdout.write(`${renderLifecycleReport({
      title: "신규 적용 판단 결과",
      sections: [
        {
          title: "대상 저장소",
          entries: [
            ["path", loaded.repoPath],
            ["manifest", loaded.manifestPath]
          ]
        },
        {
          title: "목표 release/tag",
          entries: [
            ["release", targetRelease],
            ["frameworkVersion", loaded.manifest.frameworkVersion],
            ["canonicalSource", loaded.manifest.release.canonicalSource || "unknown"]
          ]
        },
        {
          title: "manifest 기준 적용 후보",
          entries: [
            ["total", summaryResult.total],
            ["kind", describeCounts(summaryResult.byKind)],
            ["updatePolicy", describeCounts(summaryResult.byPolicy)],
            ["targetStatus", describeCounts(summaryResult.targetStatuses)]
          ],
          items: formatPathItems(candidates.missingTargets)
        },
        {
          title: "기존 파일 충돌 가능성",
          items: formatPathItems(candidates.existingTargets)
        },
        {
          title: ".hyper-waterfall/version.json 생성 계획",
          entries: [
            ["target", loaded.manifest.versionState.targetPath],
            ["exists", versionState.exists ? "yes" : "no"],
            ["schemaVersion", loaded.manifest.versionState.format.schemaVersion],
            ["frameworkVersion", loaded.manifest.versionState.format.frameworkVersion],
            ["releaseTag", loaded.manifest.versionState.format.releaseTag]
          ]
        },
        {
          title: "placeholder 체크리스트",
          items: [
            "{REPO_SLUG}",
            "{REPO_NAME}",
            "{BASE_BRANCH}",
            "{RELEASE_BRANCH}",
            "{PR_TEMPLATE_PATH}"
          ]
        },
        {
          title: "승인 요청",
          items: [
            "즉시 적용할 copy/preserve/symlink 후보를 검토한다.",
            "기존 target이 있는 항목은 덮어쓰기 전에 별도 승인을 받는다.",
            "필요하면 일반 task workflow로 전환해 변경을 추적한다."
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
