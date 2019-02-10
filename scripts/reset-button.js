const {updateEnvFile} = require('./update-env-file.js')

function resetFields (fields) {
  fields.forEach((field) => field.value = '');
  updateEnvFile();
}

document.getElementById('reset-env-io').addEventListener('click', (event) => {
  event.preventDefault();
  ioFields = Array.from(document.getElementsByClassName('io'));
  resetFields(ioFields);
});

document.getElementById('reset-env-pandoc').addEventListener('click', (event) => {
  event.preventDefault();
  pandocFields = Array.from(document.getElementsByClassName('pandoc'));
  resetFields(pandocFields);
});

document.getElementById('reset-env-bib').addEventListener('click', (event) => {
  event.preventDefault();
  bibFields = Array.from(document.getElementsByClassName('bib'));
  resetFields(bibFields);
});

document.getElementById('reset-env-z-group').addEventListener('click', (event) => {
  event.preventDefault();
  zoteroGroupFields = Array.from(document.getElementsByClassName('zotero-group'));
  resetFields(zoteroGroupFields);
});

document.getElementById('reset-env-z-user').addEventListener('click', (event) => {
  event.preventDefault();
  zoteroUserFields = Array.from(document.getElementsByClassName('zotero-user'));
  resetFields(zoteroUserFields);
});

document.getElementById('reset-env-travis').addEventListener('click', (event) => {
  event.preventDefault();
  travisFields = Array.from(document.getElementsByClassName('travis'));
  resetFields(travisFields);
});
