const {dialog} = require('electron').remote;
const {shell} = require('electron');

function openFileYml (e, element) {
  const defaultPath =  document.getElementById("path").innerHTML;
  e.preventDefault();
  dialog.showOpenDialog({
    properties: ['openFile'],
    defaultPath: defaultPath,
    filters: [
      { name: '', extensions: ['yml', 'yaml'] },
    ]
  }, function functionName(fileName) {
    if (fileName  ) {
      element.previousSibling.previousSibling.value= fileName
    }
  })
}

function openFileBib (e, element) {
  const defaultPath =  document.getElementById("path").innerHTML;
  e.preventDefault();
  dialog.showOpenDialog({
    properties: ['openFile'],
    defaultPath: defaultPath,
    filters: [
      { name: 'Bib file', extensions: ['bib', 'json', 'bibtex'] },
    ]
  }, function functionName(fileName) {
    if (fileName) {
      element.previousSibling.previousSibling.value= fileName
    }
  })
}

function openFileCsl (e, element) {
  const defaultPath =  document.getElementById("path").innerHTML;
  e.preventDefault();
  dialog.showOpenDialog({
    properties: ['openFile'],
    defaultPath: defaultPath,
    filters: [
      { name: 'CSL file', extensions: ['csl'] },
    ]
  }, function functionName(fileName) {
    if (fileName) {
      element.previousSibling.previousSibling.value= fileName
    }
  })
}

function openDir (e, element) {
  const defaultPath =  document.getElementById("path").innerHTML;
  e.preventDefault();
  dialog.showOpenDialog({
    properties: ['openDirectory'],
    defaultPath: defaultPath,
  }, function functionName(dirName) {
    if (dirName) {
      element.previousSibling.previousSibling.value= `${dirName}/`
    }
  })
}

function searchZotero() {
  shell.openExternal("https://www.zotero.org/groups/");
}

// function getGithubApiKey() {
//   shell.openExternal("https://github.com/settings/tokens/new");
// }

function getZoteroApiKey() {
  shell.openExternal("https://www.zotero.org/settings/keys/new");
}

function openPath (path) {
  shell.openExternal(path)
}

let currentDirPahtLink = document.getElementById("path");
currentDirPahtLink.addEventListener('click', (e) => {
  e.preventDefault();
  openPath('file://' + currentDirPahtLink.innerHTML);
})
