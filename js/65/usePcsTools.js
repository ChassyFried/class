//import { setCss, click } from './pcsTools.js';
import pcs from './pcsTools.js';

//const bibi = document.querySelector('#bibi');
//const pcsObj = pcs();
// bibi.style.color = 'red';

//pcsObj.setCss(bibi, 'color', 'red');
//pcsObj.setCss(bibi, 'backgroundcolor', 'black');

//bibi.addEventListener('click', () => console.log('bibi was clicked!'));
//pcsObj.click(bibi, () => console.log('bibi was clicked!'))
const bibi = pcs('#bibi');
bibi.setCss('color', 'red');
bibi.setCss('backgroundcolor', 'black');
bibi.click(() => console.log('bibi was clicked!'));
bibi.text('New Text Added');
bibi.addClass('newClass');

console.log(bibi.setCss('color'));
console.log(bibi.setCss('fontFamily'));
