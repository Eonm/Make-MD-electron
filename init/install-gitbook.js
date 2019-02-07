const fs = require('fs');
const {ipcMain} = require('electron');
const app = require('electron').app;
const {gitbookScript} = require("../templates/gitbook-bash.js");
const {writeFileNotErease} = require('../utils/fs.js');

const gitbookScriptLocation = `${app.getPath("appData")}/MakeMD/create-gitbook.sh`


async function installGitbookScript() {
  writeFileNotErease(gitbookScriptLocation, gitbookScript)
}

module.exports = {
  installGitbookScript: installGitbookScript
}
