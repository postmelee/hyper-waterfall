#!/usr/bin/env node

const { main } = require("../src/cli");

main(process.argv.slice(2), {
  stdout: process.stdout,
  stderr: process.stderr
}).then((exitCode) => {
  process.exitCode = exitCode;
}).catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
