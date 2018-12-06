const { inputParse } = require("./aoc");

const rawInput = inputParse("6.txt");
// const rawInput = inputParse("sample-6.txt");

let input = rawInput.map(v => v.split(",").map(vv => +vv.trim()));

function manhattan(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function calc(bounds) {
  let rMinX = 0,
    rMinY = 0,
    rMaxX = 0,
    rMaxY = 0;
  let size = 0;
  let minX = 0,
    minY = 0,
    maxX = 0,
    maxY = 0;
  input.forEach(c => {
    minX = Math.min(minX, c[0]);
    minY = Math.min(minY, c[1]);
    maxX = Math.max(maxX, c[0]);
    maxY = Math.max(maxY, c[1]);
  });

  minX -= bounds;
  minY -= bounds;
  maxX += bounds;
  maxY += bounds;
  let grid = new Map();
  let sums = new Map();
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      let thisc = [x, y];
      let mind, mini;
      let distances = [];
      let sum = 0;
      input.forEach((c, i) => {
        let d = manhattan(c, thisc);
        distances.push([i, d]);
        sum += d;
      });
      distances.sort((a, b) => a[1] - b[1]);
      let v;
      if (sum < 10000) {
        size++;
      }

      if (distances[0][1] === distances[1][1]) {
        v = "..";
      } else {
        v = distances[0][0];
      }
      grid.set(thisc, v);
      //   process.stdout.write("" + (v < 10 ? "0" + v : v));
    }
    // process.stdout.write("\n");
  }

  let counts = new Map();
  Array.from(grid.entries()).forEach(([k, v]) => {
    if (k[0] === minX || k[0] === maxX || k[1] === minY || k[1] === maxY) {
      counts.set(v, "--");
      return;
    }
    if (counts.get(v) === "--") {
      return;
    }
    if (counts.has(v)) {
      counts.set(v, counts.get(v) + 1);
    } else {
      counts.set(v, 1);
    }
  });
  // console.log(counts);
  let regions = Array.from(counts.entries())
    .filter(([k, v]) => v !== "--")
    .sort((a, b) => (a[1] === "--" ? 0 : a[1] - b[1]));
  //   console.log(regions);
  return [grid, regions, size];
}

const [grid, regions, sums] = calc(20);
console.log(`Part A`, regions[regions.length - 1]);
console.log(`Part B`, sums);
