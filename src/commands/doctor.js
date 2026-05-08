const { parseOptions, renderCommandHelp, renderScaffoldResult } = require("../lib/output");

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
      "Stage 3 will attach version, target, symlink, and template diagnostics."
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

  io.stdout.write(`${renderScaffoldResult({
    command: name,
    title: "Lifecycle diagnostics scaffold",
    nextStage: "Stage 3 will report version, target, symlink, and template diagnostics.",
    options: parsed.values
  })}\n`);
  return 0;
}

module.exports = {
  help,
  name,
  run,
  summary
};
