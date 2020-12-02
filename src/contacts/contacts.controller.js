const { saveContact, findContacts, findContactById, modifyContactById, removeContactById } = require("./contacts.model");

exports.createContact = async(req, res, next) => {
    try {  
        const newContact = await saveContact(req.body)
        return res.status(201).send(newContact)
    } catch (err) {
        console.log(err);
        next(err)
    }
}

exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await findContacts()
        return res.status(200).send(contacts)
    } catch (err) {
        next(err)
    }
}

exports.getContactById = async (req, res, next) => {
    try {
        const contact = await findContactById(req.params.contactId)
        if (!contact) {
            return res.status(404).send({message: "Not found"})
        }
        return res.status(200).send(contact)
    } catch (err) {
        next(err)
    }
}

exports.updateContact= async (req, res, next) => {
    try {
        const { contactId } = req.params
        const contact = await findContactById(contactId)
        if (!contact) {
            return res.status(404).send({message: "Not found"})
        }
        const updatedContact = await modifyContactById(contactId, req.body)
        return res.status(200).send(updatedContact)
    } catch (err) {
        next(err)
    }
}

exports.deleteContact=async (req, res, next) => {
    try {
        const { contactId } = req.params
        const contact = await findContactById(contactId)
        if (!contact) {
            return res.status(404).send({message: "Not found"})
        }
        await removeContactById(contactId)
        return res.status(200).send({message: "contact deleted"})
    } catch (err) {
        next(err)
    }
}
    