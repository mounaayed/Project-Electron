// preload.js
const { contextBridge, ipcRenderer } = require('electron');

console.log('ipcRenderer available:', ipcRenderer !== undefined);

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});
