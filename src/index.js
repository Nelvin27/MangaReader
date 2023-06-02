const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
var fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  let zoomLevel = 0;
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Create the zoom in button click event
  ipcMain.on('zoom-in', () => {
    zoomLevel += 0.5; // Increment the zoom level
    mainWindow.webContents.setZoomLevel(zoomLevel);
  });

  // Create the zoom out button click event
  ipcMain.on('zoom-out', () => {
    zoomLevel -= 0.5; // Decrement the zoom level
    mainWindow.webContents.setZoomLevel(zoomLevel);
  });


  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
