/*export function setCss(element, property, value) {
    element.style[property] = value;
}
export function click(element, callback) {
    element.addEventListener('click', callback);

}*/
function getCss(element, property) {
    return getComputedStyle(element)[property];
}
function text(element, str) {
    if (arguments.length === 1) {
        return element.textContent;
    }
    element.textContent = str;
}
function addClass(element, className) {
    element.classList.add(className);
}

export default function pcsTools(selector) {

    const element = document.querySelector(selector);
    return {
        getCss: (property) => getCss(element, property),

        setCss: (property, value) => setCss(element, property, value),
        text: (str) => text(element, str),
        addClass: (className) => addClass(element, className),
        click(callback) {
            element.addEventListener('click', callback);

        }

    };
}
