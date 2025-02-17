const express = require('express');
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/products', authenticate, authorize(['admin']), adminController.createProduct);
router.get('/products', authenticate, authorize(['admin']), adminController.getAllProducts);

module.exports = router;