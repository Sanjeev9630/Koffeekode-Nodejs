const express = require('express');
const userController = require('../controller/userController')
const { verifyjwt } = require('../utils/authmiddleware');

const router = express.Router();

router.post('/register', userController.registerController)
router.post('/login', userController.loginController)
router.get('/profile', verifyjwt, userController.profileController)

module.exports = router ;


