const mysql = require('mysql2/promise');

class WalletDB {
    constructor() {
        this.connection = mysql.createPool({
            host: '88.200.64.122',
            user: 'root',
            password: 'your_password',  // Ensure you use environment variables for real passwords
            database: 'blockchainApp',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async saveWallet(wallet) {
        const { publicKey, privateKey } = wallet;
        const sql = `INSERT INTO wallets (public_key, private_key) VALUES (?, ?)`;
        const [result] = await this.connection.execute(sql, [publicKey, privateKey]);
        return result.insertId;
    }

    async getWallet(publicKey) {
        const sql = `SELECT * FROM wallets WHERE public_key = ? LIMIT 1`;
        const [rows] = await this.connection.query(sql, [publicKey]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    }
    
}

module.exports = WalletDB;
