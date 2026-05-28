const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const test = require("node:test");
const manifest = require("../templates/manifest.json");
const packageJson = require("../package.json");

const root = path.resolve(__dirname, "..");
const bin = path.join(root, "bin", "hyper-waterfall.js");

function runCli(args) {
  return spawnSync(process.execPath, [bin, ...args], {
    cwd: root,
    encoding: "utf8"
  });
}

test("global help lists commands", () => {
  const result = runCli(["--help"]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Hyper-Waterfall CLI/);
  assert.match(result.stdout, /init/);
  assert.match(result.stdout, /update/);
  assert.match(result.stdout, /doctor/);
});

test("version prints package version", () => {
  const result = runCli(["--version"]);

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), packageJson.version);
});

test("package and manifest release metadata are aligned", () => {
  assert.equal(packageJson.version, manifest.frameworkVersion);
  assert.equal(manifest.release.plannedTag, `v${packageJson.version}`);
  assert.equal(manifest.release.baselineTag, "v0.2.0");
  assert.equal(manifest.release.status, "planned");
  assert.equal(manifest.versionState.format.frameworkVersion, packageJson.version);
  assert.equal(manifest.versionState.format.releaseTag, `v${packageJson.version}`);
  assert(packageJson.files.includes("README.ko.md"));
  assert(packageJson.files.includes("README.zh-CN.md"));
});

test("manifest locale sources match current M050 pack status", () => {
  const localizedFiles = manifest.files.filter((file) => {
    return file.localization && file.localization.enabled === true;
  });

  assert.equal(manifest.localization.availability.status, "complete");
  assert.match(manifest.localization.availability.note, /en, ko, and zh-CN/);
  assert.match(manifest.localization.availability.note, /zh-CN/);
  assert.match(manifest.localization.availability.note, /workflow connection is complete as of #70/);
  assert.match(manifest.localization.availability.note, /smoke\/migration coverage is complete as of #71/);

  for (const locale of manifest.localization.supportedLocales) {
    const missing = localizedFiles.filter((file) => {
      const source = file.localization.sourcePattern.replace("{locale}", locale);
      return !fs.existsSync(path.join(root, source));
    });

    assert.deepEqual(missing, [], `${locale} locale sources should exist`);
  }
});

test("command help is available", () => {
  for (const command of ["init", "update", "doctor"]) {
    const result = runCli([command, "--help"]);

    assert.equal(result.status, 0);
    assert.match(result.stdout, new RegExp(`hyper-waterfall ${command}`));
    assert.match(result.stdout, /does not modify repository files/);
  }
});

test("unknown command fails with a clear error", () => {
  const result = runCli(["unknown"]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown command: unknown/);
});

test("init prints adoption checkpoint fields", () => {
  const result = runCli([
    "init",
    "--repo",
    ".",
    "--manifest",
    "templates/manifest.json",
    "--dry-run"
  ]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /신규 적용 판단 결과/);
  assert.match(result.stdout, /대상 저장소/);
  assert.match(result.stdout, /목표 release\/tag/);
  assert.match(result.stdout, /선택 locale/);
  assert.match(result.stdout, /locale source 후보/);
  assert.match(result.stdout, /defaultLocale/);
  assert.match(result.stdout, /manifest 기준 적용 후보/);
  assert.match(result.stdout, /승인 요청/);
});

test("init reports explicit and unsupported locale requests", () => {
  const zhResult = runCli([
    "init",
    "--repo",
    ".",
    "--manifest",
    "templates/manifest.json",
    "--locale",
    "zh-CN",
    "--dry-run"
  ]);

  assert.equal(zhResult.status, 0);
  assert.match(zhResult.stdout, /requested: zh-CN/);
  assert.match(zhResult.stdout, /selected: zh-CN/);
  assert.match(zhResult.stdout, /supported: yes/);
  assert.match(zhResult.stdout, /selectedSourceStatus: exists=15/);
  assert.match(zhResult.stdout, /locale: zh-CN/);

  const unsupportedResult = runCli([
    "init",
    "--repo",
    ".",
    "--manifest",
    "templates/manifest.json",
    "--locale",
    "fr",
    "--dry-run"
  ]);

  assert.equal(unsupportedResult.status, 0);
  assert.match(unsupportedResult.stdout, /requested: fr/);
  assert.match(unsupportedResult.stdout, /selected: fr/);
  assert.match(unsupportedResult.stdout, /supported: no/);
  assert.match(unsupportedResult.stdout, /selectedSourceStatus: missing=15/);
  assert.match(unsupportedResult.stdout, /fallbackSourceStatus: exists=15/);
});

test("update prints lifecycle checkpoint fields", () => {
  const result = runCli([
    "update",
    "--repo",
    ".",
    "--manifest",
    "templates/manifest.json",
    "--from",
    "v0.2.0",
    "--to",
    "v0.3.0",
    "--dry-run"
  ]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /기존 업데이트 판단 결과/);
  assert.match(result.stdout, /현재 version/);
  assert.match(result.stdout, /현재 locale/);
  assert.match(result.stdout, /목표 release\/tag/);
  assert.match(result.stdout, /목표 release locale 지원/);
  assert.match(result.stdout, /manifest diff/);
  assert.match(result.stdout, /locale manifest diff/);
  assert.match(result.stdout, /locale 보존\/전환 판단/);
  assert.match(result.stdout, /자동 적용 가능/);
  assert.match(result.stdout, /수동 확인 필요/);
  assert.match(result.stdout, /conflict/);
  assert.match(result.stdout, /보류/);
  assert.match(result.stdout, /승인 요청/);
});

test("update preserves stored locale and reports switch requests", () => {
  const tempRepo = fs.mkdtempSync(path.join(os.tmpdir(), "hyper-waterfall-locale-"));
  const stateDir = path.join(tempRepo, ".hyper-waterfall");
  fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(
    path.join(stateDir, "version.json"),
    JSON.stringify({
      frameworkVersion: "0.2.0",
      releaseTag: "v0.2.0",
      locale: "ko",
      installedAt: "2026-05-27T00:00:00.000Z",
      updatedAt: "2026-05-27T00:00:00.000Z"
    })
  );

  const preserveResult = runCli([
    "update",
    "--repo",
    tempRepo,
    "--from",
    "v0.2.0",
    "--to",
    "v0.3.0",
    "--dry-run"
  ]);

  assert.equal(preserveResult.status, 0);
  assert.match(preserveResult.stdout, /locale: ko/);
  assert.match(preserveResult.stdout, /reason: read from version state locale/);
  assert.match(preserveResult.stdout, /selectedForDiff: ko/);
  assert.match(preserveResult.stdout, /기존 locale ko 보존/);

  const switchResult = runCli([
    "update",
    "--repo",
    tempRepo,
    "--from",
    "v0.2.0",
    "--to",
    "v0.3.0",
    "--locale",
    "zh-CN",
    "--dry-run"
  ]);

  assert.equal(switchResult.status, 0);
  assert.match(switchResult.stdout, /requested: zh-CN/);
  assert.match(switchResult.stdout, /selectedForDiff: zh-CN/);
  assert.match(switchResult.stdout, /locale 전환 요청: ko -> zh-CN/);
});

test("doctor prints non-destructive diagnostics", () => {
  const result = runCli([
    "doctor",
    "--repo",
    ".",
    "--manifest",
    "templates/manifest.json"
  ]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /doctor 진단 결과/);
  assert.match(result.stdout, /Levels: OK, WARN, ERROR, INFO/);
  assert.match(result.stdout, /version-state/);
  assert.match(result.stdout, /manifest-source/);
  assert.match(result.stdout, /localization/);
  assert.match(result.stdout, /locale-source/);
  assert.match(result.stdout, /manifest-target/);
  assert.match(result.stdout, /symlink/);
  assert.match(result.stdout, /placeholder/);
  assert.match(result.stdout, /자동 수정하지 않습니다/);
});

test("init can use the bundled manifest outside the framework repository", () => {
  const tempRepo = fs.mkdtempSync(path.join(os.tmpdir(), "hyper-waterfall-cli-"));
  const result = runCli([
    "init",
    "--repo",
    tempRepo,
    "--dry-run"
  ]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /신규 적용 판단 결과/);
  assert.match(result.stdout, /templates\/manifest\.json/);
  assert.match(result.stdout, new RegExp(`targetStatus: missing=${manifest.files.length}`));
});
