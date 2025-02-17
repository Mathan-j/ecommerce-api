const Product = require('../models/productModel');

const addProduct = async (req, res) => {
    try {
        const product = await Product.create({ ...req.body, vendor_id: req.user.id });
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

const viewProducts = async (req, res) => {
    try {
        const products = await Product.findAllByVendor(req.user.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

module.exports = { addProduct, viewProducts };