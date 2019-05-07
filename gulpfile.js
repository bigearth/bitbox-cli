const gulp = require("gulp")
const fs = require("fs-extra")

const ASSET_FILES = [
  "src/*.json",
  "src/**/*.json",
  "src/**/*.jade",
  "src/**/*.css",
  "src/**/*.png"
]

gulp.task("build", done => {
  fs.emptyDirSync("./lib")
  fs.removeSync("./lib")

  gulp.src(ASSET_FILES).pipe(gulp.dest("lib"))
  done()
})
