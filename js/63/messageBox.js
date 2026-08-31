export default function (msg, buttons = ['OK']) {
    console.log(msg);

    const div = document.createElement('div');
    div.innerText = msg;

    div.style.backgroundColor = 'lightcyan';
    div.style.border = '1px solid black';
    div.style.padding = '1em';
    div.style.height = '8.5em';
    div.style.width = '15em';
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.marginTop = '-4.5em';
    div.style.marginLeft = '-7.5em';

    const buttonDiv = document.createElement('div');

    buttonDiv.style.position = 'absolute';
    buttonDiv.style.width = '100%';
    buttonDiv.style.bottom = '1em';
    buttonDiv.style.textAlign = 'center';
    buttonDiv.style.left = '0';

    buttons.forEach(buttonText => {
        const button = document.createElement('button');
        button.innerText = buttonText;
        button.addEventListener('click', () => {
            if (buttonText === 'Yes') {
                console.log('User chose Yes');
            }
            if (buttonText === 'No') {
                console.log('User chose No');
            }
            if (buttonText === 'Maybe') {
                console.log('User chose Maybe');
            }
            if (buttonText === 'OK') {
                console.log('User chose OK');
            }
            div.remove();
        });
        buttonDiv.appendChild(button);
    })

    div.appendChild(buttonDiv);
    document.body.appendChild(div);
}