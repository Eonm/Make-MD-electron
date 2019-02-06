let {ipcRenderer} = require('electron')
let {displaySpinner, hideSpinner} = require('./spinner.js')

let makeButton = document.getElementById('make-trigger');
// let maintenanceButton = document.getElementById("trigger-maitenance");

makeButton.addEventListener('click', (e) => {
  e.preventDefault();

  let makeOption = document.getElementById('make_option').value;
  let individualy= document.getElementById('individualy').checked;

  if (individualy && makeOption != '') {
    displaySpinner();
    ipcRenderer.send('make', makeOption+'-individualy');
  } else if (makeOption != ''){
    displaySpinner();
    ipcRenderer.send('make', makeOption);
  }
})

let updateEnvBibButton = document.getElementById('update-env-bib');
updateEnvBibButton.addEventListener('click', (e) => {
  ipcRenderer.once('env-data', () => {
    ipcRenderer.send('make', 'update-bib-force');
    ipcRenderer.send('make', 'update-csl-force');
  })
})

ipcRenderer.on('maked', () => {
  hideSpinner();
})
