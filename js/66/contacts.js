/* global $*/

const contactsTable = $('#contactsTable tbody');
const addContactForm = $('#addContact');
const firstInput = $('#first');
const lastInput = $('#last');
const emailInput = $('#email');
const phoneInput = $('#phone');
const addContactButton = $('#add');

let contacts = [];

function hideAddContactForm() {
    addContactForm.hide();

    addContactForm.trigger('reset');

    addContactButton.show();

}

function displayContacts() {
    contactsTable.empty();

    if (!contacts.length) {
        contactsTable.html(`
        <tr>
            <td colspan="5">no contacts loaded</td>
        </tr>
    `);

        return;
    }

    contacts.forEach(contact => {
        const row = $(`
        <tr>
            <td>${contact.first}</td>
            <td>${contact.last}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td><button>delete</button></td>
        </tr>
    `);

        contactsTable.append(row);

        row.find('button').click(() => {
            row.remove();

            contacts = contacts.filter(c => c !== contact);

            if (!contacts.length) {
                contactsTable.html(`
                <tr>
                    <td colspan="5">no contacts loaded</td>
                </tr>
            `);
            }
        });
    });

}

$.getJSON('contacts.json')
    .done(data => {
        contacts = data;

        displayContacts();
    })
    .fail(() => {
        console.log('Could not load contacts.json');
    });

addContactForm.on('submit', e => {
    e.preventDefault();

    const newContact = {
        first: firstInput.val(),
        last: lastInput.val(),
        email: emailInput.val(),
        phone: phoneInput.val()
    };

    contacts.push(newContact);

    displayContacts();

    hideAddContactForm();

});

addContactButton.click(() => {
    addContactForm.show();

    addContactButton.hide();

});

$('#cancel').click(hideAddContactForm);