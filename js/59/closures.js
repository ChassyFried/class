'use Strict'
function multiply(a, b) {
    var product = a * b;
    return product;
}
console.log(multiply(5, 2));
console.log(multiply(3, 4));
console.log(multiply(7, 10));

function getMultiplier() {
    return function (a, b) {
        var product = a * b;
        return product;
    };
}
var product = getMultiplier();
console.log(product(3, 2));
console.log(product(6, 5));
console.log(product(5, 3));

function multiplyByTwo(a) {
    return function (b) {
        return a * b;
    }
}
var multiplyBySix = multiplyByTwo(2);

console.log(multiplyBySix(6));

function myEvery(array, testCallBack) {
    for (let i = 0; i < array.length; i++) {
        if (!testCallBack(array[i])) {
            return false;
        }
    }
    return true;
}

console.log(myEvery(["a", "B", "c"], function (letter) {
    return letter === letter.toUpperCase();
}));


function mySome(array, testCallBack) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (testCallBack(array[i])) {
            result.push(array[i]);
        }
    }
    return result;
}
console.log(mySome(["a", "B", "c"], function (letter) {

    return letter === letter.toUpperCase();

}));

console.log(mySome(["a", "B", "c"], function (letter) {

    return letter === letter.toLowerCase();

}));
const array = ["a", "B", "c"];

function isUpperCase(letter) {
    return letter === letter.toUpperCase();
}

console.log(array.some(isUpperCase));


function isLowerCase(letter) {
    return letter === letter.toLowerCase();
}

console.log(array.some(isLowerCase));