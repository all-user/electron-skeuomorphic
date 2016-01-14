let stylus = require('stylus');
let nib    = require('nib');
let fs     = require('fs');
let folder = require('folder-contents');

const STYLUS_DIR = `${ __dirname }/../src/stylus`;

function compileAll() {
    let fileNames  = folder({ path: STYLUS_DIR })['.files'].map(f => f.name);

    let tasks = fileNames.map(name => {
        let path = `${ STYLUS_DIR }/${ name }.styl`;
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, str) => {
                if (err) { reject(err); }
                resolve(str);
            });
        }).then(str => {
            return compile(str, path);
        }).catch(err => { console.error(err); });
    });

    return Promise.all(tasks);
}

function compile(str, path) {
    return new Promise((resolve, reject) => {
        stylus(str)
            .set('filename', path)
            .use(nib())
            .render((err, css) => {
                if (err) { reject(err) }
                resolve(css);
            });
    });
}

module.exports = compileAll;
