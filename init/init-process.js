#!/usr/bin/env node

//this script must be launch at each application startup !

const { checkAppDependencies } = require("./check-dependencies.js")
const { installRcFile } = require("./install-rc-file.js");
const { installMakeFile } = require("./install-makefile.js");
const { installPandocConfig } = require('./install-pandoc-config.js');

async function init () {
  await checkAppDependencies().then((dependeciesStatus) => {
    dependeciesStatus.forEach((dependencie) => {
      console.log(dependencie)
      if (dependencie[1] == false) {
        throw(`failed to validate dependecie ${dependencie[0]}`)
      }
    })
  })
  await installRcFile()
  await installMakeFile()
  await installPandocConfig()
}

init() // auto exectute init process when app is loaded

module.exports = {
  init: init
}
