const {ipcRenderer} = require('electron');

let bibOriginOption = document.getElementById("bib-origin");

bibOriginOption.addEventListener('change', (event) => {
  let bibOrigin = bibOriginOption.options[bibOriginOption.selectedIndex].value;
  let localBibField = document.getElementById("BIBLIOGRAPHY_SRC")
  if (bibOrigin == "from-local-bib") {
    Array.from(document.getElementsByClassName('bib-src')).forEach((elem)=> {
      console.log(elem)
      elem.style.display = "block";
    })
  } else {
    Array.from(document.getElementsByClassName('bib-src')).forEach((elem)=> {
      elem.style.display = "none";
      elem.value = "";
  })
  }
})

ipcRenderer.on('env-data',  (event, envData) => {
  envDataMap = new Map (envData);

  let bibOriginOption = document.getElementById("bib-origin");
  localBibField = document.getElementById("BIBLIOGRAPHY_SRC")
  if (envDataMap.get('BIBLIOGRAPHY_SRC')) {
    bibOriginOption.value="from-local-bib"
    Array.from(document.getElementsByClassName('bib-src')).forEach((elem)=> {
      elem.style.display = "block";
    })
  } else {
    bibOriginOption.value="from-zotero";
    Array.from(document.getElementsByClassName('bib-src')).forEach((elem)=> {
      elem.style.display = "none";
    })
  }
})
