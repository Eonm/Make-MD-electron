const {ipcMain} = require('electron');
const fetch = require('node-fetch');
const fs = require('fs');
const {copyMakefile} = require('../background/copy-make-file.js');
const {getParsedEnvData} = require('../background/load-env-file.js')

ipcMain.on('get-travis-status', (event) => {
  getParsedEnvData().then((parsedEnvData) =>  {
    getTravisStatus(parsedEnvData).then((travisStatus) => {
        event.sender.send('display-travis-status', travisStatus)
      }).catch((error) => {
        event.sender.send('display-travis-status', 2)
    })
  })
})

function getTravisStatus(envData) {
  let envMap = new Map(envData);
  let url = `https://api.travis-ci.org/repos/${envMap.get("GITHUB_USER_NAME")}/${envMap.get("GITHUB_REPO_NAME")}`;
  console.log(url)
  return fetch(url)
    .then(function(response) {
      console.log(response.status)
      if (response.status === 200) {
        return response.json();
      } else {
        throw "error"
      }
    })
    .then(function(myBlob) {
      return myBlob.last_build_status
    })
}

ipcMain.on('update-travis-file', (event, buildType) => {
  getParsedEnvData().then((parsedEnvData) =>  {
    generateTravisConf(parsedEnvData, buildType)
    copyMakefile()
  })
})

function generateTravisConf(envData, buildType) {
  let envMap = new Map(envData)

  let outputDirs = [];
  outputDirs.push(envMap.get("PDF_DIR"))
  outputDirs.push(envMap.get("PRESENTATION_DIR"))
  outputDirs.push(envMap.get("GIT_BOOK_DIR"))

  let formatedOuputDirs = outputDirs.filter((elem) => elem != undefined).map((elem) => {
    return ` - ${elem}**/*`
  }).join("\n")

  let envFileValues = []
  envMap.forEach((val, key, map) => {
    if (key != "Z_API_KEY") {
      envFileValues.push(` - ${key}:"${val}"`);
    }
  })
       let travisTemplate = `language: generic
before_install:
- sudo apt-get update
- sudo apt install -y nodejs npm texlive-latex-base texlive-latex-extra texlive-lang-french
 texlive-lang-european pandoc pandoc-citeproc texlive-fonts-recommended;
env:
 global:
${envFileValues.join("\n")}
script:
- make ${buildType}
deploy:
 provider: releases
 api_key: $GITHUB_API_KEY
 file_glob: true
 file:
${formatedOuputDirs}
 on:
   repo: ${envMap.get("GITHUB_USER_NAME")}/${envMap.get("GITHUB_REPO_NAME")}
   tags: true
`
fs.writeFile("./.travis.yml", travisTemplate, function(err) {
   if(err) {
       return console.log(err);
   }
     console.log("The travis file was saved!");
 });
};
