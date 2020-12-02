const fs = require('fs')
const path = require('path')

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
 fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        const contacts = JSON.parse(data);
        console.table(contacts);
  })
}

function getContactById(contactId) {
 fs.readFile(contactsPath, 'utf-8', (err, data) => {
   if (err) {
     throw err;
   }
   const contacts = JSON.parse(data);
   const contact = contacts.find((el) => el.id === contactId);
   
   if (contact === undefined) {
     console.log(`Contact with ID ${contactId} not found`);
     return
   }

    console.log(contact);
  })
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        const contacts = JSON.parse(data);
        const newContacts = contacts.filter((el) => el.id !== contactId);
      
        if (newContacts.length === contacts.length) {
            console.log(`Contact with ID ${contactId} not found`);
            return;
        }
      
        fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
        if (err) {
          throw err;
        }
        console.table(newContacts);
      });
    
  })
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            throw err;
      }
      
    const contacts = JSON.parse(data);
    
      contacts.push({
            id: contacts.length + 1,
            name: name,
            email: email,
            phone: phone,
        });

        fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) {
          throw err;
        }
        console.table(contacts);
      });

  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};