//this script disable config button at top of the app window (pdf_config, gitbook_config, presentation_config)

const {ipcRenderer} = require('electron');


function disableConfig () {
  document.getElementById('pdfconfig').style.display = 'none';
  document.getElementById('presentationconfig').style.display = 'none';
  document.getElementById('gitbookconfig').style.display = 'none';
}


function displayAllowedConfigs(data) {
  let allowedConfig = new Map(data);

  if (allowedConfig.get('pdfConfigValidation') == (false | undefined) ) {
    document.getElementById('pdfconfig').style.display = "none";
  } else {
    document.getElementById('pdfconfig').style.display = "block";
  }
  if (allowedConfig.get('gitbookValidation') == (false | undefined) ) {
    document.getElementById('gitbookconfig').style.display = "none";
  } else {
    document.getElementById('gitbookconfig').style.display = "block";
  }
  if (allowedConfig.get('presentationValidation') == (false | undefined) ) {
    document.getElementById('presentationconfig').style.display = "none";
  } else {
    document.getElementById('presentationconfig').style.display = "block";
  }
}

ipcRenderer.on('env-data-validation', (event, data) => {
  displayAllowedConfigs(data);
})

ipcRenderer.on('working-dir', (event) => {
  disableConfig();
})
