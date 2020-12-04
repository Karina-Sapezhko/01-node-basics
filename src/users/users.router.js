const { Router } = require('express');
const { authorize } = require('../helpers/authorize.middleware');
const { avatarUpload } = require('../helpers/avatarUpload');
const { getCurrentUser, updateAvatarUser } = require('./users.controller');

const router = Router();

router.get('/current', authorize, getCurrentUser);

router.patch('/avatars', avatarUpload,authorize, updateAvatarUser);

exports.usersRouter = router;