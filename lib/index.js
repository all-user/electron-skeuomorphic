'use strict';

var remote = require('remote');
var compileAll = remote.require(__dirname + '/lib/compile.js');

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
    Array.from(elements).forEach(function (elm) {
        Array.from(elm.classList).filter(function (c) {
            return c.match(/^__.*$/);
        }).forEach(function (c) {
            return elm.classList.remove(c);
        });

        elm.classList.add('__' + name);
    });
}