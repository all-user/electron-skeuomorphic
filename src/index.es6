let remote = require('remote');
let compileAll = remote.require(`${ __dirname }/lib/compile.js`);

document.addEventListener('DOMContentLoaded', () => {
    let genButton  = document.querySelector('#generate');
    let grayButton = document.querySelector('#change-gray');
    let pinkButton = document.querySelector('#change-pink');

    genButton.addEventListener('click', () => {
        compileAll().then(cssStrArr => {
            cssStrArr.forEach(css => {
                let style = document.createElement('style');
                style.textContent = css;
                document.head.appendChild(style);
            });
        });
    });

    grayButton.addEventListener('click', () => {
        let skeus = document.querySelectorAll('.skeu');
        changeSkeu(skeus, 'gray');
    });

    pinkButton.addEventListener('click', () => {
        let skeus = document.querySelectorAll('.skeu');
        changeSkeu(skeus, 'pink');
    });
});

function changeSkeu(elements, name) {
    Array.from(elements).forEach(elm => {
        Array.from(elm.classList)
            .filter(c => c.match(/^__.*$/))
            .forEach(c => elm.classList.remove(c));

        elm.classList.add(`__${ name }`)
    });
}
