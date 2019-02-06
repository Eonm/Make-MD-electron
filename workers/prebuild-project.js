#!/usr/bin/env node

//load rc content and scaffold dir and files

const app = require('electron').app;
const {ipcMain} = require('electron');
const {loadRawRcData, loadRcData} = require("../background/load-rc-file.js");
const { populatePandocFiles } = require("./prebuild-pandoc-config.js");
const { installEnvFile } = require("./update-env-file.js");
const { scaffoldDirs } = require("../utils/scaffold.js");


async function prebuildProject(attempt=0) {
  if (attempt > 1) {throw ("failed to prebuild project")}

  loadRcData().then( async (rcData) => {
    await scaffoldDirs(rcData);
    await populatePandocFiles(rcData);
  }).catch(() => {prebuildProject(attempt + 1)})
  await installEnvFile();
}

ipcMain.on("prebuild-project", (event) => {
  console.log("prebuilding-project")
  prebuildProject().then(() => {
    event.sender.send('project-builded')
  });
})

module.exports = {
  prebuildProject: prebuildProject
}
