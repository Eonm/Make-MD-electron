const {dialog} = require('electron').remote;
const {ipcRenderer} = require('electron');

function setPath() {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, function triggerActions(dirName) {
    if (dirName) {
      console.log(dirName[0])
      ipcRenderer.send('set-working-dir', dirName[0]);
    }
  })
}

window.onload=function()   {
  let setPathButton = document.getElementById('setPathButton');

  setPathButton.addEventListener('click', (e) => {
    e.preventDefault();
    setPath();
  });


  let openProjectButton = document.getElementById('open-project');

  openProjectButton.addEventListener('click', (e) => {
    e.preventDefault();
    setPath();
    ipcRenderer.once('env-data', (event, envData) => {
      if (envData) {
        document.getElementById("menu-create").click(); // moving to create menu
      }
    })
  });
}

ipcRenderer.on('working-dir', (event, path) => {
  console.log('workin-dir-set');
  document.getElementById('path').innerHTML = path;
  ipcRenderer.send('get-env-data');
})

module.exports = {
  setPath: setPath
}
