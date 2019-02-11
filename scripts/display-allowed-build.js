const {ipcRenderer} = require('electron');

function disableBuild () {
  document.getElementById('make_option_pdf').disabled = true;
  document.getElementById('travis_option_pdf').disabled = true;
  document.getElementById('make_option_gitbook').disabled = true;
  document.getElementById('travis_option_gitbook').disabled = true;
  document.getElementById('make_option_presentation').disabled = true;
  document.getElementById('travis_option_presentation').disabled = true;
  document.getElementById('make-trigger').disabled = true;
    document.getElementById('generate-travis-conf').disabled = false;
}

function displayAllowedBuilds(data) {
  allowedBuild = new Map(data);

  if (allowedBuild.get('pdfValidation') == (false | undefined) ) {
    document.getElementById('make_option_pdf').disabled = true;
    document.getElementById('travis_option_pdf').disabled = true;
  } else {
    document.getElementById('make_option_pdf').disabled = false;
    document.getElementById('travis_option_pdf').disabled = false;
  }
  if (allowedBuild.get('gitbookValidation')== (false | undefined) ) {
    document.getElementById('make_option_gitbook').disabled = true;
    document.getElementById('travis_option_gitbook').disabled = true;
  } else {
    document.getElementById('make_option_gitbook').disabled = false;
    document.getElementById('travis_option_gitbook').disabled = false;
  }
  if (allowedBuild.get('presentationValidation') == (false | undefined) ) {
    document.getElementById('make_option_presentation').disabled = true;
    document.getElementById('travis_option_presentation').disabled = true;
  } else {
    document.getElementById('make_option_presentation').disabled = false;
    document.getElementById('travis_option_presentation').disabled = false;
  }
  if (allowedBuild.get('pdfValidation') == false && allowedBuild.get('gitbookValidation') == false && allowedBuild.get('presentationValidation') == false ) {
    document.getElementById('make-trigger').disabled = true;
    document.getElementById('generate-travis-conf').disabled = true
  } else {
    document.getElementById('make-trigger').disabled = false;
    document.getElementById('generate-travis-conf').disabled = false;
  }
}

ipcRenderer.on('env-data', (event, envData) => {
  if (envData) {
    ipcRenderer.send('validate-env-data');
  } else {
    disableBuild();
  }
})

ipcRenderer.on('env-data-validation', (event, data) => {
  console.log('validation');
  console.log(data);
  displayAllowedBuilds(data);
})
