const { Router } = require('express')
const { validate } = require('../helpers/validate.middleware')
const { createContact, getContacts, getContactById, updateContact, deleteContact } = require('./contacts.controller')
const { createContactSchema,updateContactSchema } = require('./contacts.schemes')

const router = Router()

router.post('/', validate(createContactSchema), createContact)
router.get('/', getContacts)
router.get('/:contactId', getContactById)
router.patch('/:contactId', validate(updateContactSchema), updateContact)
router.delete('/:contactId', deleteContact)

exports.contactsRouter= router