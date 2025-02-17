const db = require('../config/db');

class Product {
    static async create(product) {
        const { name, description, category, old_price, new_price, start_date, expiry_date, delivery_amount, free_delivery, image_url, vendor_id } = product;
        const [result] = await db.query(
            'INSERT INTO products (name, description, category, old_price, new_price, start_date, expiry_date, delivery_amount, free_delivery, image_url, vendor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, category, old_price, new_price, start_date, expiry_date, delivery_amount, free_delivery, image_url, vendor_id]
        );
        return result.insertId;
    }

    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const [rows] = await db.query('SELECT * FROM products LIMIT ? OFFSET ?', [limit, offset]);
        return rows;
    }

    static async search(query, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const [rows] = await db.query('SELECT * FROM products WHERE name LIKE ? OR description LIKE ? LIMIT ? OFFSET ?', [`%${query}%`, `%${query}%`, limit, offset]);
        return rows;
    }
}

module.exports = Product;