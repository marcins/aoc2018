const fs = require("fs");
function inputParse(filename) {
  return fs
    .readFileSync(filename, "utf8")
    .split("\n")
    .map(v => v.trim())
    .filter(v => v !== "");
}

module.exports = {
  inputParse
};
