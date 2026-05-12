let assert = require("assert");
let fs = require("fs");

describe("CLI scaffolds", () => {
  it("documents and maps the android scaffold", () => {
    const source = fs.readFileSync("index.js", "utf8");

    assert(source.includes("Options include android, react, angular, vuejs, nextjs and node."));
    assert(source.includes("scaffold === 'android'"));
    assert(source.includes("https://github.com/taherdhanera/bitbox-scaffold-android.git"));
  });
});

