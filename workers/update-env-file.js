#!/usr/bin/env node

//Get a notification ("update-env-file")
//Create .env file if not exist
//Update .env file with data from fields
//Send back notification ("env-file-updated")

let {ipcMain} = require('electron');
const {writeFileNotErease, writeFile} = require('../utils/fs.js');
const {loadRawRcData} = require("../background/load-rc-file.js")

const envFileLocation = "./.env"

async function updateEnvFile(envData) {
  await writeFile(envFileLocation, envData);
}

async function installEnvFile() {
  await loadRawRcData().then((rcData) => {
    writeFileNotErease(envFileLocation, rcData);
  })
}

function formatEnvData(rawEnvData) {
  console.log(rawEnvData)
  return rawEnvData
  .map((envData) => envData.join("="))
  .join("\n");
}

ipcMain.on('update-env-file', (event,data) => {
  updateEnvFile(formatEnvData(data)).then(() => {

    event.sender.send('env-file-updated')
  })
})

module.exports = {
  formatEnvData: formatEnvData,
  installEnvFile: installEnvFile
}
