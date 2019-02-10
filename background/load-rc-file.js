#!/usr/bin/env node

//load default config file for new project

const {ipcMain, app} = require('electron');

const { readLocalFile, parseRawEnvData } = require("./load-env-file.js")
const { installRcFile } = require("../init/install-rc-file.js")

const rcDataPath = `${app.getPath("appData")}/MakeMD/make-md.rc`;

function loadRcData() {
  return readLocalFile(rcDataPath).then((rcData) => parseRawEnvData(rcData)).catch((error) => {
    installRcFile()
  })
}

function loadRawRcData () {
  return readLocalFile(rcDataPath);
}

ipcMain.on('load-rc-data', (event,data) => {
  loadRcData().then((parsedRcData) => event.sender.send('rc-data', parsedRcData));
})

module.exports = {
  loadRcData: loadRcData,
  loadRawRcData: loadRawRcData
}
