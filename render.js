const { ipcRenderer } = require('electron');

document.getElementById('start-btn').addEventListener('click', () => {
  ipcRenderer.send('start-capture');
});

document.getElementById('stop-btn').addEventListener('click', () => {
  ipcRenderer.send('stop-capture');
});
