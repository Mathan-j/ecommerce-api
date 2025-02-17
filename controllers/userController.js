const Product = require('../models/productModel');

const viewProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

const searchProducts = async (req, res) => {
    const { query, page, limit } = req.query;
    try {
        const products = await Product.search(query, page, limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error searching products', error });
    }
};

module.exports = { viewProducts, searchProducts };