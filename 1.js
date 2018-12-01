const { inputParse } = require("./aoc");

const deltas = inputParse("1.txt").map(v => +v);
const seen = new Set();
let i = 0;
let freq = 0;
while (true) {
  freq = deltas.reduce((f, v) => {
    let newF = f + v;
    if (seen.has(newF)) {
      console.log("Seen twice:", newF);
      process.exit(0);
    }
    seen.add(newF);
    return newF;
  }, freq);
  if (++i === 1) {
    console.log(`Initial freq`, freq);
  }
}
