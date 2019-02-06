const exec = require('child_process').exec;
let {ipcMain, Notification} = require('electron');
const app = require('electron').app;
const path = require('path')

function spawnMakeProcess(makeOption) {
  console.log(`make -f ${app.getPath("appData")}/MakeMD/Makefile ${makeOption} -C ${process.cwd()}`)
  return new Promise(function(resolve, reject) {
    let make = exec(`make -f ${app.getPath("appData")}/MakeMD/Makefile ${makeOption} -C ${process.cwd()}`);
    let success = new Notification({
      title : "MakeMD",
      body: `creating : ${makeOption}`,
      icon : './assets/icons/png/64x64.png'
      }).show();

    make.stderr.on('error', (data) => {
      console.log(data)
      reject()
    })

    make.on('close', (code) => {
      if (code == 0) {
        let success = new Notification({
            title : "MakeMD",
            body: `${makeOption} : created`,
            icon : './assets/icons/png/64x64.png'
        }).show();
        resolve()
      } else {
        reject();
      }
    })
  })
}

ipcMain.on('make', (event, makeOption) => {
  spawnMakeProcess(makeOption).then(() =>  {
    event.sender.send('maked');
    console.log('done');
  }).catch(() => {
    event.sender.send('maked');
  })
})
