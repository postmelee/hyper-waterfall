function writeLine(stream, text = "") {
  stream.write(`${text}\n`);
}

function optionName(spec) {
  return spec.split(/\s+/)[0];
}

function optionRequiresValue(spec) {
  return /<[^>]+>/.test(spec);
}

function parseOptions(args, optionDefinitions) {
  const supported = new Map(optionDefinitions.map(([spec]) => {
    return [optionName(spec), { spec, requiresValue: optionRequiresValue(spec) }];
  }));
  const values = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      return { help: true, values };
    }

    if (!arg.startsWith("-")) {
      return { error: `Unexpected argument: ${arg}`, values };
    }

    const [rawName, inlineValue] = arg.split("=", 2);
    const definition = supported.get(rawName);

    if (!definition) {
      return { error: `Unknown option: ${rawName}`, values };
    }

    if (!definition.requiresValue) {
      values[rawName] = true;
      continue;
    }

    const value = inlineValue || args[index + 1];
    if (!value || value.startsWith("-")) {
      return { error: `Missing value for option: ${rawName}`, values };
    }

    values[rawName] = value;
    if (!inlineValue) {
      index += 1;
    }
  }

  return { values };
}

function renderCommandHelp({ name, summary, usage, options, description }) {
  const optionRows = options.map(([spec, text]) => {
    return `  ${spec.padEnd(24)} ${text}`;
  });

  return [
    `hyper-waterfall ${name}`,
    "",
    summary,
    "",
    "Usage:",
    `  ${usage}`,
    "",
    "Options:",
    ...optionRows,
    "  --help, -h              Show this help.",
    "",
    ...description,
    "",
    "This command does not modify repository files in the MVP flow."
  ].join("\n");
}

function renderScaffoldResult({ command, title, nextStage, options }) {
  const optionLines = Object.keys(options).length === 0
    ? ["  none"]
    : Object.entries(options).map(([key, value]) => `  ${key}: ${value}`);

  return [
    `hyper-waterfall ${command}`,
    "",
    title,
    "",
    "Accepted options:",
    ...optionLines,
    "",
    "Safety:",
    "  This MVP scaffold does not modify repository files.",
    "  Continue through the Hyper-Waterfall approval gates before applying changes.",
    "",
    nextStage
  ].join("\n");
}

module.exports = {
  parseOptions,
  renderCommandHelp,
  renderScaffoldResult,
  writeLine
};
