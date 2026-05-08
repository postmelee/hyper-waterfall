const { parseOptions, renderCommandHelp, renderScaffoldResult } = require("../lib/output");

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
      "Stage 2 will attach manifest, version-state, and migration guide details."
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
    title: "Existing repository update checkpoint scaffold",
    nextStage: "Stage 2 will read version state and print update candidates.",
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
