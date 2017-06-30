import {renderScoreFromLS} from '../components/localStorage'

var div = document.querySelector('div.main');
var about = {
    name: 'about',
    match: (text) => text === 'about',
    onBeforeEnter: () => console.log(`onBeforeEnter about`),
    onEnter: () => {
        div.innerHTML = '<p>Г.Г.Борисевич</p> <a href="https://vk.com/id55569389" target="_blank">VK</a><br><hr>';
        renderScoreFromLS();
    },
    onLeave: () => div.innerHTML = ''
};

export { about };