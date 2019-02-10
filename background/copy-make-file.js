const {ipcMain, app} = require('electron');
const fs = require('fs');
const makeFilePath = `${app.getPath("appData")}/MakeMD/Makefile`;

function copyMakefile() {
  fs.createReadStream(makeFilePath).pipe(fs.createWriteStream('Makefile'));
}

module.exports = {
  copyMakefile: copyMakefile,
}
