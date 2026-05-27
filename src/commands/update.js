const path = require("node:path");
const {
  classifyUpdateCandidates,
  describeCounts,
  formatLocaleSourceItems,
  formatPathItems,
  getManifestSourceRoot,
  getTargetRelease,
  loadManifest,
  summarizeLocalization,
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

function getStoredLocale(versionState) {
  if (!versionState.exists || versionState.error || !versionState.data) {
    return {
      reason: "version state has no readable locale field",
      value: "unknown"
    };
  }

  const data = versionState.data;
  const value = data.locale
    || data.selectedLocale
    || (data.localization && (data.localization.locale || data.localization.selectedLocale))
    || "unknown";

  return {
    reason: value === "unknown" ? "locale field is not recorded yet (#70)" : "read from version state",
    value
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
    const storedLocale = getStoredLocale(versionState);
    const localization = summarizeLocalization(
      getManifestSourceRoot(loaded.manifestPath),
      loaded.manifest,
      storedLocale.value === "unknown" ? undefined : storedLocale.value
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
          title: "현재 locale",
          entries: [
            ["locale", storedLocale.value],
            ["reason", storedLocale.reason],
            ["storage", "locale 선택 저장 위치는 #70 범위"]
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
          title: "목표 release locale 지원",
          entries: localization.exists
            ? [
                ["supportedLocales", localization.supportedLocales.join(", ") || "none"],
                ["defaultLocale", localization.defaultLocale],
                ["fallbackLocale", localization.fallbackLocale],
                ["availability", localization.availabilityStatus],
                ["preserveSelectedLocaleOnUpdate", localization.preserveSelectedLocaleOnUpdate ? "true" : "false"]
              ]
            : [["status", "manifest localization contract not found"]]
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
          title: "locale manifest diff",
          entries: localization.exists
            ? [
                ["selectedLocale", localization.selectedLocale],
                ["selectedSupported", localization.selectedSupported ? "yes" : "no"],
                ["selectedSourceStatus", describeCounts(localization.selectedSourceStatuses)],
                ["fallbackSourceStatus", describeCounts(localization.fallbackSourceStatuses)]
              ]
            : [["status", "manifest localization contract not found"]],
          items: localization.exists
            ? formatLocaleSourceItems(localization.items.filter((item) => item.selectedStatus !== "exists"))
            : ["없음"]
        },
        {
          title: "locale 보존/전환 판단",
          items: localization.exists
            ? [
                localization.preserveSelectedLocaleOnUpdate
                  ? "기존 locale 기록이 있으면 보존을 기본값으로 판단한다."
                  : "manifest가 기존 locale 보존 기본값을 선언하지 않는다.",
                "locale 전환 요청은 update 부수 효과가 아니라 별도 승인 항목으로 분리한다.",
                "실제 locale 선택 저장 위치와 전환 workflow 실행은 #70 범위다."
              ]
            : ["manifest localization contract not found"]
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
            "현재 locale, 목표 release locale 지원, locale source 누락과 fallback 후보를 검토한다.",
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
