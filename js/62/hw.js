const button = document.querySelector('button');
let count = 2;
function createButton() {
    const newButton = document.createElement('button');
    newButton.textContent = count++;
    document.body.appendChild(newButton);
    newButton.addEventListener('click', createButton);

}
button.addEventListener('click', createButton);


