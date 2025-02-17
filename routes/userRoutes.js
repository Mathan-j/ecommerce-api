const express = require('express');
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/products', authenticate, userController.viewProducts);
router.get('/products/search', authenticate, userController.searchProducts);

module.exports = router;