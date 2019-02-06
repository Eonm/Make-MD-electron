let {ipcMain} = require('electron');
const process = require('process');

ipcMain.on('set-working-dir', (event, path) => {
  process.chdir(path);
  event.sender.send('working-dir', path)
});

// ipcMain.on("set-new-project-dir", (event, path) => {
//   process.chdir(path);
//   event.sender.send('working-dir', path);
//   event.sender.send('new-project-dir');
// })
