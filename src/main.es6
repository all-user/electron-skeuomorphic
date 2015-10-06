// import 'babel/pollyfill'
import app           from 'app'
import BrowserWindow from 'browser-window'

import cr from 'crash-reporter'
cr.start();

let mainWindow = null;

app.on('window-all-closed', () => { process.platform != 'darwin' && app.quit(); });

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 800, heitht: 600 });
    mainWindow.loadUrl(`file://${ __dirname }/../index.html`);
    mainWindow.openDevTools();
    mainWindow.on('closed', () => { mainWindow = null; });
});