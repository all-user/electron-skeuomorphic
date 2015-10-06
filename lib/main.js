// import 'babel/pollyfill'
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _app = require('app');

var _app2 = _interopRequireDefault(_app);

var _browserWindow = require('browser-window');

var _browserWindow2 = _interopRequireDefault(_browserWindow);

var _crashReporter = require('crash-reporter');

var _crashReporter2 = _interopRequireDefault(_crashReporter);

_crashReporter2['default'].start();

var mainWindow = null;

_app2['default'].on('window-all-closed', function () {
    process.platform != 'darwin' && _app2['default'].quit();
});

_app2['default'].on('ready', function () {
    mainWindow = new _browserWindow2['default']({ width: 800, heitht: 600 });
    mainWindow.loadUrl('file://' + __dirname + '/../index.html');
    mainWindow.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});