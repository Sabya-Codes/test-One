const express = require('express');
const mysql = require('mysql2');
const { State, City } = require('country-state-city');


const app = express();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sabya@123',
  database: 'Travel_Chatbot'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


async function insertData() {
  try {
  
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

app.get('/insertData', async (req, res) => {
  await insertData();
  res.send('Data inserted into MySQL database');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
