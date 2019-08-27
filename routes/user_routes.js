'use strict'

var express = require('express');


var user_controller = require('../controllers/userController');

var router = express.Router();






/*
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

*/

//USERS

router.post('/register', user_controller.register);
router.post('/login', user_controller.login);
router.post('/profile', user_controller.profile);
router.post('/change_password', user_controller.change_password);

module.exports = router;