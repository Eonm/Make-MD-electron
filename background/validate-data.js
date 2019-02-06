#!/usr/bin/env node

//Get a notification ("validate-env-data")
//Send back notification ("env-data-validation") which describe which model is ok or not : [ ["MODEL1", true], ["MODEL2", false], ... ]

let {ipcMain} = require('electron');
const _ = require('lodash');

const { readLocalFile,  parseRawEnvData } = require("./load-env-file.js")

//Some fields might be empty while submiting;
function removeEmpytEnvData (envData) {
  return envData.filter((variable) => {
    console.log(variable[0]+ variable[1])
    return variable[1] != (undefined | "" | null)
  });
}

function validateData (model, envData) { // envData = [ ["K1", "V1"], ["K2", "V2"], ... ]
  envKey = envData.map((variable) => variable[0]).sort();
  let diff = _.difference(model, envKey);
  if (diff.length === 0) {
    return true
  } else if (diff.length >= 1) {
    return false
  } else {
    false
  }
}

function validateModels(models, envData) {
  const modelsName = Object.keys(models);
  return modelsName.map((modelName) => {
    compulsoryEnvVariable = models[modelName];
    return [modelName , validateData(compulsoryEnvVariable, envData)]
  })
}

//validationModels = compulsory variable to build specific document
const validationModels = {
  pdfConfigValidation: [
    "PDF_CONFIG"
  ],
  presentationConfigValidation: [
    "PRESENTATION_CONFIG"
  ],
  gitbookConfigValidation: [
    "GIT_BOOK_CONFIG"
  ],
  zoteroRemoteUserValidation : [
    "Z_API_KEY",
    "Z_USER_ID",
  ],
  zoteroGroupValidation : [
    "Z_GROUP_ID",
  ],
  pandocValidation : [
    "PDF_CONFIG",
    "PRESENTATION_CONFIG",
    "GIT_BOOK_CONFIG"
  ],
  iOValidation : [
    "MD_SRC",
    "PDF_DIR",
    "GIT_BOOK_SRC",
    "GIT_BOOK_DIR",
    "PRESENTATION_SRC",
    "PRESENTATION_DIR",
  ],
  pdfValidation : [
    "MD_SRC",
    "PDF_DIR",
    "PDF_CONFIG"
  ],
  gitbookValidation : [
    "GIT_BOOK_SRC",
    "GIT_BOOK_DIR",
    "GIT_BOOK_CONFIG"
  ],
  presentationValidation : [
    "PRESENTATION_SRC",
    "PRESENTATION_DIR",
    "PRESENTATION_CONFIG"
  ],
  bibliographyValidation : [
    "BIBLIOGRAPHY",
    "CSL_FILE",
    "CSL_STYLE"
  ]
};

ipcMain.on('validate-env-data', (event) => {
  readLocalFile("./.env")
    .then((envData) => parseRawEnvData(envData))
    .then((parsedEnvData) => {
      // let parsedAndTrimedData = removeEmpytEnvData(parsedEnvData);
      event.sender.send('env-data-validation', validateModels(validationModels, parsedEnvData))
    })
});

module.exports = {
  removeEmpytEnvData: removeEmpytEnvData,
  validateData: validateData,
  validateModels: validateModels
};
