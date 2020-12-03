const { Router } = require('express')
const { authorize } = require('../helpers/authorize.middleware')
const { validate } = require('../helpers/validate.middleware')
const { register, login, logout } = require('./auth.controller')
const { registerSchema, loginSchema } = require('./auth.schemes')

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/logout', authorize, logout)

exports.authRouter = router;