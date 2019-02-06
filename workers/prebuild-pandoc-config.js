// message("prebuild-pandoc-config");
// send ("pandoc-config-builded");

const app = require('electron').app;
const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;

const { pandocConfigs } =  require("../templates/pandoc-files.js");
const { writeFileNotErease } = require("../utils/fs.js");

async function populatePandocFiles(data) {
  const pandocFiles = ["PDF_CONFIG", "PRESENTATION_CONFIG", "GIT_BOOK_CONFIG"];
  const dataMap = new Map(data);
  pandocFiles.forEach((configName) => {
    fs.copyFileSync(`${app.getPath("appData")}/MakeMD/Templates/${configName}`, `${dataMap.get(configName)}`, COPYFILE_EXCL);
  })
}

module.exports = {
  populatePandocFiles: populatePandocFiles
}
