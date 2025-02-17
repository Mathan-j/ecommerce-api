const db = require('../config/db');

class Staff {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM users WHERE role = ?', ['staff']);
        return rows;
    }
}

module.exports = Staff;