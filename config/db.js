const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testConnection = async () => {
    try {
        const connection = await pool.promise().getConnection();
        console.log('Database connected successfully!');
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err.stack);
        process.exit(1); // Stop the server if DB connection fails
    }
};

testConnection();

module.exports = pool.promise();