const bcrypt = require('bcryptjs');
//const mysql = require('mysql2');
/*
const connection = mysql.createConnection({
    host: '88.200.64.122',
    user: 'hackaton',
    password: 'pepe',
    database: 'hackaton'
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to the database successfully!");
});
*/
class User {
    constructor(username, email, password, walletAddress) {
        this.username = username;
        this.email = email;
        this.password = bcrypt.hashSync(password, 10); // Hash the password
        this.walletAddress = walletAddress;
    }

    setWalletAddress(walletAddress) {
        const sql = 'UPDATE users SET wallet_address = ? WHERE email = ?';
        connection.promise().query(sql, [walletAddress, this.email])
            .then(([results, fields]) => {
                console.log("Wallet address updated successfully!");
            })
            .catch(err => {
                console.error("An error occurred:", err.message);
            });
    }

    saveToDatabase() {
        const sql = 'INSERT INTO users (username, email, password, wallet_address) VALUES (?, ?, ?, ?)';
        return connection.promise().query(sql, [this.username, this.email, this.password, this.walletAddress])
            .then(([results, fields]) => {
                console.log("User registered successfully!");
            })
            .catch(err => {
                console.error("An error occurred:", err.message);
            });
    }

    static async findByEmail(connection, email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        try {
            const [results, fields] = await connection.promise().query(sql, [email]);
            if (results.length > 0) {
                const user = new User(results[0].username, results[0].email, results[0].password);
                user.walletAddress = results[0].wallet_address;
                return user;
            } else {
                console.log("User not found");
                throw new Error("User not found");
            }
        } catch (err) {
            console.error("An error occurred:", err.message);
            throw err;
        }
    }
}

module.exports = { User };
