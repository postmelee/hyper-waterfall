const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const test = require("node:test");
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
