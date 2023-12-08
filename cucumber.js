// cucumber.js
let common = [
  "features/**/*.feature", // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  "--require features/step-definitions/**/*.ts", // Load step definitions
  //   "--format progress-bar", // Load custom formatter
  //   "--format node_modules/cucumber-pretty", // Load custom formatter
  `--format-options '{"snippetInterface": "synchronous"}'`,
].join(" ");

module.exports = {
  default: common,
};
