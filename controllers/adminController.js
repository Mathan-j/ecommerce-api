const User = require('../models/userModel');
const Vendor = require('../models/vendorModel');
const Staff = require('../models/staffModel');
const Product = require('../models/productModel');

const viewAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

const viewAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.findAll();
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vendors', error });
    }
};

const viewAllStaff = async (req, res) => {
    try {
        const staff = await Staff.findAll();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff', error });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

module.exports = { viewAllUsers, viewAllVendors, viewAllStaff, createProduct, getAllProducts };