#!/usr/bin/env node

const fs = require('fs');
const {ipcMain} = require('electron');
const app = require('electron').app;
const {makeFileTemplate} = require("../templates/make-file.js");
const {writeFileNotErease} = require('../utils/fs.js');

const makeFileLocation = `${app.getPath("appData")}/MakeMD/Makefile`


async function installMakeFile() {
  writeFileNotErease(makeFileLocation, makeFileTemplate)
}

module.exports = {
  installMakeFile: installMakeFile
}
