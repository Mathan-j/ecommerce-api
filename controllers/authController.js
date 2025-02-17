const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userId = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { register, login };
