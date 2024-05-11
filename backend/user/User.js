import bcrypt from 'bcryptjs';
import mysql from 'mysql';

// Database connection setup
const connection = mysql.createConnection({ // RETRIEVE YOUR DATABASE CREDENTIALS
    host: '88.200.64.122',
    user: 'hackaton',
    password: 'pepe',
    database: 'hackaton'
});
connection.connect(err => {
    if (err) throw err;
    console.log("Connected to the database successfully!");
});
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = bcrypt.hashSync(password, 10); // Hash the password
        this.walletAddress = null;
    }

    setWalletAddress(walletAddress) {
        this.walletAddress = walletAddress;
        // Update the user's record with the new wallet address
        const sql = 'UPDATE users SET wallet_address = ? WHERE email = ?';
        connection.query(sql, [walletAddress, this.email], function (err, result) {
            if (err) throw err;
            console.log("Wallet address updated successfully!");
        });
    }

    saveToDatabase() {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        connection.query(sql, [this.username, this.email, this.password], (err, result) => {
            if (err) throw err;
            console.log("User registered successfully!");
        });
    }
    

    saveToDatabase() {
        const sql = 'INSERT INTO users (username, email, password, wallet_address) VALUES (?, ?, ?, ?)';
        connection.query(sql, [this.username, this.email, this.password, this.walletAddress], (err, result) => {
            if (err) throw err;
            console.log("User registered successfully!");
        });
    }

    static findByEmail(email, callback) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [email], (err, results) => {
            if (err) return callback(err, null);
            if (results.length > 0) {
                const user = new User(results[0].username, results[0].email, results[0].password);
                user.walletAddress = results[0].wallet_address;
                return callback(null, user);
            } else {
                return callback("User not found", null);
            }
        });
    }
}

export { User };