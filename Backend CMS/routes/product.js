const express = require('express')
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication')
var checkRole = require('../services/checkRole');
const { addProduct, getProduct, getByCategory, getById, deleteById, update } = require('../controller/productController');

router.post('/add', auth.authenticateToken, checkRole.checkRole, addProduct)
router.get('/get', auth.authenticateToken, getProduct)
router.get('/getByCategory/:id', auth.authenticateToken, getByCategory)
router.get('/getById/:id', auth.authenticateToken, getById)
router.patch('/update', auth.authenticateToken, checkRole.checkRole, update)
router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, deleteById)

module.exports = router;