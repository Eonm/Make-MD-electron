const {ipcRenderer} = require('electron');

function allowConfiguration () {
  document.getElementById("create-doc").style.display = "block";
  Array.from(document.getElementsByClassName("configure")).forEach((elem) => {
    elem.classList.remove("disabled");
  })
}

function disableConfiguration() {
  document.getElementById("create-doc").style.display = "none";
  Array.from(document.getElementsByClassName("configure")).forEach((elem) => {
    elem.classList.add("disabled");
  })
  document.getElementById("menu-open-or-create").click();
}

document.getElementById("menu-open-or-create").click();
ipcRenderer.on("env-data", (event, envData) => {
  if (envData) {
    allowConfiguration();
    document.getElementById('env-file').style.display = "block"
  } else {
    disableConfiguration();
  }
})

ipcRenderer.on('working-dir', (event, path) => {
  document.getElementById('env-file').style.display = "none"
})
