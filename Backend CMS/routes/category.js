const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication')
var checkRole = require('../services/checkRole');
const { addCategory, getCategory, updateCategory } = require('../controller/categoryController');

router.post('/add', auth.authenticateToken, checkRole.checkRole, addCategory)
router.get('/get', auth.authenticateToken, getCategory)
router.patch('/update', auth.authenticateToken, checkRole.checkRole, updateCategory)

module.exports = router;