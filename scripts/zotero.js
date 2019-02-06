let {ipcRenderer} = require('electron');

let updateEnvZUserButton = document.getElementById('update-env-z-user');
updateEnvZUserButton.addEventListener('click', (e) => {
  e.preventDefault();
  ipcRenderer.once('env-data', () => {
    ipcRenderer.send('make', 'update-bib-force');
  })
})

let updateEnvZGroupButton = document.getElementById('update-env-z-group');
updateEnvZGroupButton.addEventListener('click', (e) => {
  e.preventDefault();
  ipcRenderer.once('env-data', () => {
    ipcRenderer.send('make', 'update-bib-force');
  })
})
