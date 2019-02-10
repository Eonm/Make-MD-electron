#!/usr/bin/env node

//Recieve a notification ("get-env-data")
//Give back data to the view ("env-data", data)

const {ipcMain} = require('electron');
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);

const envFile = "./.env";

async function readLocalFile(path) {
  const texteDuFichier = await readFile(path, { encoding: 'utf8' });
  return texteDuFichier
}

function parseRawEnvData (rawEnvData) { // return [["KEY", "value"], ["KEY1", "value1"]...]
  return rawEnvData.split("\n")
  .filter(function (line) {
    if (line != null && !line.trim().startsWith("#")) {
      return line
    };
  })
  .map(function (line) {
    return line.split("=")
  })
  .filter(function (line) {
    if (line[1]) {
      return line
    }
  })
}

function getParsedEnvData() {
  return readLocalFile(envFile).then((envData) => parseRawEnvData(envData));
}

ipcMain.on('get-env-data', (event,data) => {
  console.log("loading env data")
  readLocalFile(envFile).then((envData) => parseRawEnvData(envData))
  .then((parsedEnvData) => {
    console.log("env data = "+ parsedEnvData)
    event.sender.send('env-data', parsedEnvData)
  }).catch((error) => {
    console.log("failed to load env file")
    event.sender.send('env-data', null)
  })
})

module.exports = {
  parseRawEnvData: parseRawEnvData,
  readLocalFile: readLocalFile,
  getParsedEnvData: getParsedEnvData,
}
