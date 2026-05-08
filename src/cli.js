const packageJson = require("../package.json");
const initCommand = require("./commands/init");
const updateCommand = require("./commands/update");
const doctorCommand = require("./commands/doctor");
const { writeLine } = require("./lib/output");

const commands = new Map([
  [initCommand.name, initCommand],
  [updateCommand.name, updateCommand],
  [doctorCommand.name, doctorCommand]
]);

function hasHelpFlag(args) {
  return args.includes("--help") || args.includes("-h");
}

function renderHelp() {
  return [
    "Hyper-Waterfall CLI",
    "",
    "Usage:",
    "  hyper-waterfall <command> [options]",
    "  hyper-waterfall --help",
    "  hyper-waterfall --version",
    "",
    "Commands:",
    ...Array.from(commands.values()).map((command) => {
      return `  ${command.name.padEnd(8)} ${command.summary}`;
    }),
    "",
    "This CLI is a convenience execution channel. GitHub Release/tag,",
    "templates/manifest.json, and migration guides remain canonical."
  ].join("\n");
}

async function main(args = [], io = {}) {
  const stdout = io.stdout || process.stdout;
  const stderr = io.stderr || process.stderr;

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    writeLine(stdout, renderHelp());
    return 0;
  }

  if (args[0] === "--version" || args[0] === "-v") {
    writeLine(stdout, packageJson.version);
    return 0;
  }

  const commandName = args[0];
  const command = commands.get(commandName);

  if (!command) {
    writeLine(stderr, `Unknown command: ${commandName}`);
    writeLine(stderr, "");
    writeLine(stderr, renderHelp());
    return 1;
  }

  return command.run(args.slice(1), { stdout, stderr, packageJson });
}

module.exports = {
  commands,
  main,
  renderHelp
};
