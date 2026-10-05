function getElement(selector) {
    return document.querySelector(selector);
}
function setCss(element, property, value) {
    Element.style[property] = value;
}
function getCss(element, property) {
    return getComputedStyle(element)[property];
}
function on(element, eventType, callback) {
    element.addEventListener(eventType, callback);
}
function click(element, callback) {
    on(element, 'click', callback);
}
function hide(element) {
    setCss(element, 'display', 'none');
}

function show(element) {
    setCss(element, 'display', 'inline-block');
}

function sparkle(element, duration, speed = 500) {
    const colors = ['red', 'blue', 'green', 'orange', 'purple'];
    let colorIndex = 0;
    let time = 0;

    const intervalId = setInterval(() => {

        element.style.color = colors[colorIndex];

        colorIndex++;

        if (colorIndex === colors.length) {
            colorIndex = 0;
        }

        time += speed;

        if (time >= duration) {
            clearInterval(intervalId);
        }

    }, speed);
}

export default function (selector) {
    const element = getElement(selector);
    return {
        css: function (property, value) {
            console.log(arguments);

            if (arguments.length < 2) {
                return getCss(element, property);
            } else {
                setCss(element, property, value);
            }
        },

        on: (eventType, callback) => on(element, eventType, callback),

        click: callback => click(element, callback),

        hide: () => hide(element),

        show: () => show(element),

        sparkle: (duration, speed) => sparkle(element, duration, speed)
    };
}