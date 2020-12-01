const { Router } = require('express');
const { validate } = require('../helpers/validate.middleware');
const { createContact, getContacts, getContactById, updateContact, deleteContact } = require('./contacts.controller');
const { createContactSchema, updateContactSchema, validateIdSchema } = require('./contacts.schemes');

const router = Router();

router.post('/', validate(createContactSchema), createContact);
router.get('/', getContacts);
router.get('/:id', validate(validateIdSchema, "params"), getContactById);
router.patch('/:id', validate(validateIdSchema, "params"), validate(updateContactSchema), updateContact);
router.delete('/:id',validate(validateIdSchema, "params"), deleteContact);

exports.contactsRouter = router;