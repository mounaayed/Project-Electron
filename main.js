const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const screenshot = require('screenshot-desktop');
const axios = require('axios');

//let captureInterval;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false 
    }
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('start-capture', () => {
  console.log('Capture started');
  interval = setInterval(() => {
    screenshot().then((img) => {
      axios.post('http://localhost:3000/screenshots', {
        userId: 'user1',
        imageUrl: img.toString('base64')
      }).then(response => {
        console.log('Screenshot saved');
      }).catch(error => {
        console.error('Error saving screenshot', error);
      });
    }).catch(error => {
      console.error('Error taking screenshot', error);
    });
  }, 5000); // Capture every 5 seconds
});
ipcMain.on('stop-capture', () => {
  console.log('Capture stopped');
  clearInterval(interval);
});