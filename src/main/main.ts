import {app, BrowserWindow, ipcMain, session, shell} from 'electron';
import {join} from 'path';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: join(__dirname, 'logo.ico'),
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    mainWindow.webContents.openDevTools()
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}
 
app.whenReady().then(() => {
  createWindow();
 


  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);

})

// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
  // Event emitter for sending asynchronous messages
  event.sender.send('asynchronous-reply', 'async pong')
})

ipcMain.on('open-url', (event, arg) => {
  // Event emitter for sending asynchronous messages
  shell.openExternal(arg)

  
})
