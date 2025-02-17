const express = require('express');
const vendorController = require('../controllers/vendorController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/products', authenticate, authorize(['vendor']), vendorController.addProduct);
router.get('/products', authenticate, authorize(['vendor']), vendorController.viewProducts);

module.exports = router;