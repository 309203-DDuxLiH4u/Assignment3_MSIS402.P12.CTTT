const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors'); // Thêm dòng này

const app = express();
const port = 3000;

// Sử dụng middleware CORS
app.use(cors()); // Thêm dòng này để bật CORS cho mọi yêu cầu

// Kết nối tới MySQL
const connection = mysql.createConnection({
  host: 'localhost',   
  user: 'root',        
  password: '123456',  
  database: 'mydatabase' 
});

// Kết nối MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Thiết lập thư mục tĩnh để phục vụ file HTML
app.use(express.static(path.join(__dirname, 'public')));

// API lấy dữ liệu từ MySQL
app.get('/get-data', (req, res) => {
  const query = 'SELECT * FROM users'; 
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results); 
  });
});

// Chạy server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
