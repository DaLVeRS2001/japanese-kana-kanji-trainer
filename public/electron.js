const { app, BrowserWindow } = require('electron');

require('@electron/remote/main').initialize();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    icon: __dirname + '/favicon.ico',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.setResizable(false);

  win.loadURL('https://plati-editor2.vercel.app/main');
};

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
