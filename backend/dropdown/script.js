const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for your React frontend

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your DB username
  password: 'Sabya@123', // your DB password
  database: 'Travel_Chatbot' // your database name
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// API to fetch all states
app.get('/api/states', (req, res) => {
  const query = 'SELECT * FROM states';
  console.log(query);
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// API to fetch cities by state code
app.get('/api/cities', (req, res) => {
  const stateCode = req.query.state;
  const query = 'SELECT * FROM cities WHERE state_code = ?';
  console.log(query);
  db.query(query, [stateCode], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// API to fetch museums by city name
app.get('/api/museums', (req, res) => {
  const cityName = req.query.city;
  const query = 'SELECT * FROM museums WHERE city_name = ?';
  db.query(query, [cityName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 5000');
});
