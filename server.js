const mysql = require('mysql2');
const dotenv = require('dotenv');
const express = require('express');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');
const db = require('./config/db'); // Import the db module
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const staffRoutes = require('./routes/staffRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const initializeSuperAdmin = async () => {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

    if (!superAdminEmail || !superAdminPassword) {
        console.error('Super admin email or password is not set in environment variables.');
        process.exit(1);
    }

    const existingAdmin = await User.findByEmail(superAdminEmail);
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
        await User.create({ name: 'Super Admin', email: superAdminEmail, password: hashedPassword, role: 'admin' });
        console.log('Super Admin initialized');
    } else {
        console.log('Super Admin already exists');
    }
};

// Initialize super admin
initializeSuperAdmin();

// Define routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/staff', staffRoutes);
app.use('/vendor', vendorRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});