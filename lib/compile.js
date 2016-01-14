'use strict';

var stylus = require('stylus');
var nib = require('nib');
var fs = require('fs');
var folder = require('folder-contents');

var STYLUS_DIR = __dirname + '/../src/stylus';

function compileAll() {
    var fileNames = folder({ path: STYLUS_DIR })['.files'].map(function (f) {
        return f.name;
    });

    var tasks = fileNames.map(function (name) {
        var path = STYLUS_DIR + '/' + name + '.styl';
        return new Promise(function (resolve, reject) {
            fs.readFile(path, 'utf8', function (err, str) {
                if (err) {
                    reject(err);
                }
                resolve(str);
            });
        }).then(function (str) {
            return compile(str, path);
        }).catch(function (err) {
            console.error(err);
        });
    });

    return Promise.all(tasks);
}

function compile(str, path) {
    return new Promise(function (resolve, reject) {
        stylus(str).set('filename', path).use(nib()).render(function (err, css) {
            if (err) {
                reject(err);
            }
            resolve(css);
        });
    });
}

module.exports = compileAll;