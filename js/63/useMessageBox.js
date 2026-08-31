import messageBox from "./messageBox.js";

const form = document.querySelector('#addMessage');
const msgInput = document.querySelector('#msg');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    const buttons = ['Yes', 'No', 'Maybe'];

    messageBox(message, buttons);
});