'use strict';

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _remote = require('remote');

var _remote2 = _interopRequireDefault(_remote);

var compileAll = _remote2['default'].require(__dirname + '/lib/compile.js');

document.addEventListener('DOMContentLoaded', function () {
    var genButton = document.querySelector('#generate');
    var grayButton = document.querySelector('#change-gray');
    var pinkButton = document.querySelector('#change-pink');

    genButton.addEventListener('click', function () {
        compileAll().then(function (cssStrArr) {
            cssStrArr.forEach(function (css) {
                var style = document.createElement('style');
                style.textContent = css;
                document.head.appendChild(style);
            });
        });
    });

    grayButton.addEventListener('click', function () {
        var skeus = document.querySelectorAll('.skeu');
        changeSkeu(skeus, 'gray');
    });

    pinkButton.addEventListener('click', function () {
        var skeus = document.querySelectorAll('.skeu');
        changeSkeu(skeus, 'pink');
    });
});

function changeSkeu(elements, name) {
    _Array$from(elements).forEach(function (elm) {
        _Array$from(elm.classList).filter(function (c) {
            return c.match(/^__.*$/);
        }).forEach(function (c) {
            return elm.classList.remove(c);
        });

        elm.classList.add('__' + name);
    });
}