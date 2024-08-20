const express = require('express');
const mysql = require('mysql2');
const { State, City } = require('country-state-city');

// Initialize Express
const app = express();

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sabya@123',
  database: 'Travel_Chatbot'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Function to insert states and cities into the database
async function insertData() {
  try {
    // Insert States
    const states = State.getStatesOfCountry('IN');
    const stateQuery = `INSERT INTO States (name, state_code, country_code) VALUES ?`;

    const stateData = states.map(state => [
      state.name,
      state.isoCode,
      state.countryCode
    ]);

    db.query(stateQuery, [stateData], (err, result) => {
      if (err) throw err;
      console.log('States inserted successfully');
    });

    // Insert Cities
    const cities = City.getCitiesOfCountry('IN');
    const cityQuery = `INSERT INTO Cities (name, state_code, country_code, latitude, longitude) VALUES ?`;

    const cityData = cities.map(city => [
      city.name,
      city.stateCode = state.name,
      city.countryCode,
      city.latitude,
      city.longitude
    ]);

    db.query(cityQuery, [cityData], (err, result) => {
      if (err) throw err;
      console.log('Cities inserted successfully');
    });

  } catch (error) {
    console.error('Error occurred while inserting data:', error);
  }
}

// Set up a route to trigger the insert operation
app.get('/insertData', async (req, res) => {
  await insertData();
  res.send('Data inserted into MySQL database');
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
