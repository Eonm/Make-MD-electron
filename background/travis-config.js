const {ipcMain} = require('electron');
const {copyMakefile} = require('../background/copy-make-file.js');
const {getParsedEnvData} = require('../background/load-env-file.js');
const {writeFile} = require('../utils/fs.js');

ipcMain.on('update-travis-file', (event, buildType) => {
  getParsedEnvData().then((parsedEnvData) =>  {
    generateTravisConf(parsedEnvData, buildType)
    copyMakefile()
  })
})

function generateTravisConf(envData, buildType) {
  let envMap = new Map(envData)
  let outputDirs = [];
  let envFileValues = []

  outputDirs.push(envMap.get("PDF_DIR"))
  outputDirs.push(envMap.get("PRESENTATION_DIR"))
  outputDirs.push(envMap.get("GIT_BOOK_DIR"))

  let formatedOuputDirs = outputDirs.filter((elem) => elem != undefined).map((elem) => {
    return ` - ${elem}**/*`
  }).join("\n")

  envMap.forEach((val, key, map) => {
    if (key != "Z_API_KEY") {
      envFileValues.push(` - ${key}:"${val}"`);
    }
  })
       let travisTemplate = `language: generic
before_install:
- sudo apt-get update
- sudo apt install -y nodejs npm texlive-full pandoc pandoc-citeproc
env:
 global:
 - ZOTERO_API_KEY:$ZOTERO_API_KEY
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

writeFile('./.travis.yml', travisTemplate)
};
