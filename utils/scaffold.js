const fs = require('fs');
const path = require('path');

function scaffoldDirs(paths) {
  const dirs = ["MD_SRC", "PDF_DIR", "PRESENTATION_SRC", "PRESENTATION_DIR", "GIT_BOOK_SRC", "GIT_BOOK_DIR", "PDF_CONFIG", "PRESENTATION_CONFIG", "GIT_BOOK_CONFIG"]

  paths.forEach((p) => {
    if (dirs.includes(p[0])) {
      try {
        const parsedPath = path.parse(p[1]);
        if (parsedPath.dir == ".") {
          fs.mkdirSync(p[1])
        } else {
          fs.mkdirSync(parsedPath.dir)
        }
      } catch {/*do noting  if dir exist already*/}
    }
  })
}

module.exports = {
  scaffoldDirs: scaffoldDirs
}
