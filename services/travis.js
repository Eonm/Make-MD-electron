const {ipcMain} = require('electron');
const fetch = require('node-fetch');
const {getParsedEnvData} = require('../background/load-env-file.js');

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
