'use strict';

// import 'babel/pollyfill'
var app = require('app');
var BrowserWindow = require('browser-window');

var cr = require('crash-reporter');
cr.start();

var mainWindow = null;

app.on('window-all-closed', function () {
    process.platform != 'darwin' && app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({ width: 800, heitht: 600 });
    mainWindow.loadUrl('file://' + __dirname + '/../index.html');
    mainWindow.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});