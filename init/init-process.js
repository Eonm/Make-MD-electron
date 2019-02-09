#!/usr/bin/env node

//this script must be launch at each application startup !
const fs = require('fs');
const app = require('electron').app;
const { checkAppDependencies } = require("./check-dependencies.js")
const { installRcFile } = require("./install-rc-file.js");
const { installMakeFile } = require("./install-makefile.js");
const { installPandocConfig } = require('./install-pandoc-config.js');
const { installGitbookScript } = require('./install-gitbook.js');

async function init () {
  try {fs.mkdirSync(`${app.getPath("appData")}/MakeMD/`);} catch { /*do noting if dir already exists*/}
  await installRcFile()
  await installMakeFile()
  await installPandocConfig()
  await installGitbookScript()
  await checkAppDependencies().then((dependeciesStatus) => {
    dependeciesStatus.forEach((dependencie) => {
      console.log(dependencie)
      if (dependencie[1] == false) {
        throw(`failed to validate dependecie ${dependencie[0]}`)
      }
    })
  })
}

init() // auto exectute init process when app is loaded

module.exports = {
  init: init
}
