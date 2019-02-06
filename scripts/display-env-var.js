const {ipcRenderer} = require('electron');

function displayEnvData (envData) {
  new Map(envData).forEach(function (value, key, map) {
     let domElement = document.getElementById(key);
       if (domElement) {
         domElement.value = value || '';
     }
  })
};

function emptyEnvFields () {
  Array.from(document.getElementsByClassName('env')).forEach  (function(field) {
    field.value = '';
  })
}

ipcRenderer.on('env-data', (event, envData) => {
  if (envData) {
    displayEnvData(envData);
  } else {
    emptyEnvFields()
  }
})
