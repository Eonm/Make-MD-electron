const {ipcRenderer} = require('electron');
const {dialog} = require('electron').remote;
const { setPath } = require('./set-path.js')

const newProjectButton = document.getElementById('create-project');

newProjectButton.addEventListener('click', (e) => {
  e.preventDefault();
  setPath();
  ipcRenderer.once('working-dir', () => {
    ipcRenderer.send('prebuild-project');
  })
});

ipcRenderer.on('project-builded', () => {
  document.getElementById("menu-create").click();
  return ipcRenderer.send('get-env-data');
})

function displayCreateDocument() {
  document.getElementById('create-doc').style.display = 'block';
  document.getElementById('configure-first').style.display = 'none';
}
