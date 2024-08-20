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
  const { state_name } = req.query;

  // Make sure state_code is provided
  if (!state_name) {
    return res.status(400).send({ error: 'state_code is required' });
  }

  // Query database for cities with the given state_code
  db.query('SELECT * FROM Cities WHERE state_name = ?', [state_name], (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Database query failed' });
    }

    res.send(results);
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
  console.log('Server started on port 3000');
});
