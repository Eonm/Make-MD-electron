const {ipcRenderer} = require('electron');

function updateEnvFile () {
  let value = Array.from(document.getElementsByClassName('env'))
    .map((elem) => {
      return [elem.id, elem.value];
    });
  ipcRenderer.send('update-env-file', value);
}

Array.from(document.getElementsByClassName('update-env')).forEach((button) => {
  button.addEventListener('click', (e) => {
    updateEnvFile();
  })
})

ipcRenderer.on('env-file-updated', (event) => {
  ipcRenderer.send('get-env-data');
})
