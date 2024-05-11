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

module.exports = router;
