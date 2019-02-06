const {writeFileNotErease} = require('../utils/fs.js');
const {pandocConfigs} = require("../templates/pandoc-files.js");
const app = require('electron').app;
const fs = require('fs');

const pandocConfigDir = `${app.getPath("appData")}/MakeMD/Templates/`

async function installPandocConfig() {
  try {fs.mkdirSync(pandocConfigDir);} catch { /*do noting if dir already exists*/}
  Object.keys(pandocConfigs).forEach((k) => {
    writeFileNotErease(`${pandocConfigDir}${k}`, pandocConfigs[k]);
  })
}

module.exports = {
  installPandocConfig: installPandocConfig
}
