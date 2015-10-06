'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _stylus = require('stylus');

var _stylus2 = _interopRequireDefault(_stylus);

var _nib = require('nib');

var _nib2 = _interopRequireDefault(_nib);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _folderContents = require('folder-contents');

var _folderContents2 = _interopRequireDefault(_folderContents);

var STYLUS_DIR = __dirname + '/../src/stylus';

function compileAll() {
    var fileNames = (0, _folderContents2['default'])({ path: STYLUS_DIR })['.files'].map(function (f) {
        return f.name;
    });

    var tasks = fileNames.map(function (name) {
        var path = STYLUS_DIR + '/' + name + '.styl';
        return new _Promise(function (resolve, reject) {
            _fs2['default'].readFile(path, 'utf8', function (err, str) {
                if (err) {
                    reject(err);
                }
                resolve(str);
            });
        }).then(function (str) {
            return compile(str, path);
        })['catch'](function (err) {
            console.error(err);
        });
    });

    return _Promise.all(tasks);
}

function compile(str, path) {
    return new _Promise(function (resolve, reject) {
        (0, _stylus2['default'])(str).set('filename', path).use((0, _nib2['default'])()).render(function (err, css) {
            if (err) {
                reject(err);
            }
            resolve(css);
        });
    });
}

exports['default'] = compileAll;
module.exports = exports['default'];