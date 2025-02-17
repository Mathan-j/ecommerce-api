const express = require('express');
const staffController = require('../controllers/staffController');
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/products', authenticate, authorize(['staff']), staffController.addProduct);
router.get('/products', authenticate, authorize(['staff']), staffController.viewProducts);

module.exports = router;