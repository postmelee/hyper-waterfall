const { parseOptions, renderCommandHelp, renderScaffoldResult } = require("../lib/output");

const name = "init";
const summary = "Prepare a new repository adoption dry-run.";
const options = [
  ["--repo <path>", "Target repository path. Defaults to the current directory."],
  ["--manifest <path>", "Framework manifest path. Defaults to templates/manifest.json."],
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
      "Stage 2 will attach manifest parsing and version-state details."
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
    title: "New adoption checkpoint scaffold",
    nextStage: "Stage 2 will read the manifest and print adoption candidates.",
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
