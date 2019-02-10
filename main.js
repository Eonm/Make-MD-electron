// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
// const app = electron.app
const Menu = require('electron').Menu;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({frame: true, width: 800, height: 450, icon: path.join(__dirname, 'assets/icons/png/64x64.png')}); //, titleBarStyle: 'hidden' frame: false,
  // webPreferences: {    nodeIntegration: false,    // preload: path.join(__dirname, 'preload.js')
  //}
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

require("./init/init-process.js");
require("./background/working-dir");
require("./background/load-env-file.js");
require("./background/validate-data.js");
require("./workers/prebuild-project.js");
require("./workers/prebuild-pandoc-config.js");
require("./workers/trigger-make.js");
require("./services/travis.js");
