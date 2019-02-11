let {ipcRenderer} = require('electron')

function travisStatusSuccess () {
  document.getElementById('travis-circle').style.color = "#34c84a"
}

function travisStatusUndefined () {
    document.getElementById('travis-circle').style.color = "#5f5f5f"
}

document.getElementById('travis-build-status').addEventListener('click', (event) => {
  event.preventDefault();
  ipcRenderer.send('get-travis-status');
})

ipcRenderer.on('env-data', (event, envData) => {
  if (envData) {
    ipcRenderer.send('get-travis-status');
  }
})

ipcRenderer.on('display-travis-status', (event, status) => {
  console.log(status)
  if (status == 0 ) {
    travisStatusSuccess()
  } else if (status == 2) {
    travisStatusUndefined()
  }
})

document.getElementById('generate-travis-conf').addEventListener('click', (event) => {
  event.preventDefault();
  buildType = document.getElementById('travis-job').value;
  if (buildType) {
    ipcRenderer.send('update-travis-file', buildType);
  }
})
