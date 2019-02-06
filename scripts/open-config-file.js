const {shell , ipcRenderer} = require('electron');

ipcRenderer.on('working-dir', (event, path) => {
  function openProjectFile(filename) {
    shell.openExternal('file://' + path + filename);
  }

  let envFileButton = document.getElementById('env-file');
  envFileButton.addEventListener('click', (e) => {
    e.preventDefault();
    openProjectFile('/.env');
  })

  let pdfConfigButton = document.getElementById('pdfconfig')
  pdfConfigButton.addEventListener('click', (e) => {
    e.preventDefault();
    pdfConfigFilePath = document.getElementById("PDF_CONFIG").value.replace(/^\.\//, "/");
    openProjectFile(pdfConfigFilePath);
  })

  let gitbookConfigButton = document.getElementById('gitbookconfig')
  gitbookConfigButton.addEventListener('click', (e) => {
    e.preventDefault();
    gitbookConfigPath = document.getElementById("GIT_BOOK_CONFIG").value.replace(/^\.\//, "/");
    openProjectFile(gitbookConfigPath);
  })

  let presentationConfigButton = document.getElementById('presentationconfig')
  presentationConfigButton.addEventListener('click', (e) => {
    e.preventDefault();
    presentationConfigPath= document.getElementById("PRESENTATION_CONFIG").value.replace(/^\.\//, "/");
    openProjectFile(presentationConfigPath);
  })
})
