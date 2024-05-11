const express = require('express');
const router = express.Router();

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
            res.send('Login successful');
            console.log('Login successful');
        } else {
            res.send('Login failed');
            console.log('Login failed');
        }
    });
});

  
module.exports = router;
