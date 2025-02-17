-- Create database
CREATE DATABASE ecommerce;

-- Use the database
USE ecommerce;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'vendor', 'buyer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    old_price DECIMAL(10, 2),
    new_price DECIMAL(10, 2),
    start_date DATE,
    expiry_date DATE,
    delivery_amount DECIMAL(10, 2),
    free_delivery BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(255),
    vendor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_id) REFERENCES users(id)
);

-- Insert super admin user
INSERT INTO users (name, email, password, role)
VALUES ('Super Admin', 'superadmin@example.com', '$2a$10$SuperAdminPassword123', 'admin');