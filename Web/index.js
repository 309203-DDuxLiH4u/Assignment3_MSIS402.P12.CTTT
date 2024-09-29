const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Use environment variables for sensitive data
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Handle requests
module.exports = (req, res) => {
  const query = 'SELECT * FROM users'; 
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
