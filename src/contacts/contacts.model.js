
const uuid = require('uuid')
const fs = require('fs')
const path = require('path');

const contactsPath = path.join(__dirname, "../../db/contacts.json");

exports.saveContact = async (contactParams) => {
    const contacts = await fs.promises.readFile(contactsPath, "utf8");
    const contactsParse = await JSON.parse(contacts);
    const newContact = {
        id: uuid.v4(),
        ...contactParams
    }
    const allContacts = [newContact, ...contactsParse];
    await fs.promises.writeFile(contactsPath, JSON.stringify(allContacts), error => {
        if (error) {
            throw error;
        }
    });
    return newContact
}

exports.findContacts = async () => {
    const contacts = await fs.promises.readFile(contactsPath, "utf8");
    const contactsParse = await JSON.parse(contacts);
    return contactsParse
}

exports.findContactById = async (contactId) => {
    const contacts = await fs.promises.readFile(contactsPath, "utf8");
    const contactsParse = await JSON.parse(contacts);
   return contactsParse.find((el) => el.id === contactId);
}

exports.modifyContactById = async (id, contactParams) => {
    const contacts = await fs.promises.readFile(contactsPath, "utf8");
    const contactsParse = await JSON.parse(contacts);
    const contactIndex = await contactsParse.findIndex(contact => contact.id === id)
    if (contactIndex === -1) {
        return
    }

    contactsParse[contactIndex] = {
        ...contactsParse[contactIndex],
        ...contactParams,
    }

    await fs.promises.writeFile(contactsPath, JSON.stringify(contactsParse), error => {
        if (error) {
            throw error;
        }
    });
    return contactsParse[contactIndex]
}

exports.removeContactById = async(id) => {
    const contacts = await fs.promises.readFile(contactsPath, "utf8");
    const contactsParse = await JSON.parse(contacts);
    const contactIndex = await contactsParse.findIndex(contact => contact.id === id)
    if (contactIndex === -1) {
        return
    }
    contactsParse.splice(contactIndex, 1)
    await fs.promises.writeFile(contactsPath, JSON.stringify(contactsParse), error => {
        if (error) {
            throw error;
        }
    });
}