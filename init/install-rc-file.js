#!/usr/bin/env node

const fs = require('fs');
let {ipcMain} = require('electron');
const app = require('electron').app;
const {rcFileTemplate} = require("../templates/rc-file.js")

const rcFileLocation = `${app.getPath("appData")}/MakeMD/make-md.rc`

async function installRcFile() {
  const {writeFileNotErease} = require('../utils/fs.js');
  writeFileNotErease(rcFileLocation, rcFileTemplate)
}

module.exports = {
  installRcFile: installRcFile
}
