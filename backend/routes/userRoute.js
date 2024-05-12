const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// POST endpoint for /api
router.get('/userinfo', (req, res) => {
    const db = req.db;  // Access the db connection
    // Use the db connection for your database queries
    db.query('SELECT * FROM users', (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });


// POST endpoint for /api/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const db = req.db;  // Access the db connection
    // Use the db connection for your database queries
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {


        if (err) throw err;
        if (results.length > 0) {
            const token = jwt.sign({ id: results[0].id }, 'your_secret_key', { expiresIn: '1h' });
            res.json({
                message: 'Login successful',
                token: token,
                loggedIn: true
            });
            console.log('Login successful');
        } else {                loggedIn: false

            res.json({
                message: 'Login failed',
                loggedIn: false
            });
            res.json({
                message: 'Login failed',
                loggedin: false
            });
            console.log('Login failed');
        }
    });
}); 

  
module.exports = router;
