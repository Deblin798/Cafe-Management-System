const express = require('express');
const connection = require('../connection');
const { postSignUp, getDetails, updateDetails, checkToken, postLogin, resetPassword, changePassword } = require('../controller/userController');
const router = express.Router();
var auth = require('../services/authentication')
var checkRole = require('../services/checkRole')

router.post('/signup', postSignUp)
router.post('/login', postLogin)
router.post('/forgotPassword', resetPassword)
router.get('/get', auth.authenticateToken, checkRole.checkRole, getDetails)
router.patch('/update', auth.authenticateToken, checkRole.checkRole, updateDetails)
router.get('/checkToken', auth.authenticateToken, checkToken)
router.post('/changePassword',auth.authenticateToken, changePassword)


module.exports = router;