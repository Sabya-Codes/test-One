const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const {join} = require("node:path");

const app = express();
app.use(cors()); // Enable CORS for your React frontend


const db = new sqlite3.Database(':memory:');


const loadSQL = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read SQL file:', err);
            return callback(err);
        }
        db.exec(data, callback);
    });
};

const sqlFilePath = join(__dirname, '../heritage_culture_data/heritage_culture.sql');

loadSQL(sqlFilePath, (err) => {
    if (err) {
        console.error('Failed to load SQL data:', err);
        return;
    }
    console.log('SQL data loaded into in-memory database.');
});


app.get('/api/states', (req, res) => {
    const query = 'SELECT * FROM states';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});


app.get('/api/cities', (req, res) => {
    const {state_code} = req.query;


    if (!state_code) {
        return res.status(400).send({error: 'state_code is required'});
    }


    db.all('SELECT * FROM cities WHERE state_code = ?', [state_code], (err, rows) => {
        if (err) {
            return res.status(500).send({error: 'Database query failed'});
        }

        res.send(rows);
    });
});


app.get('/api/museums', (req, res) => {
    const {city} = req.query;
    const query = 'SELECT * FROM museums WHERE city_name = ?';
    db.all(query, [city], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(rows);
    });
});


app.get('/api/prices', (req, res) => {
    const {museum} = req.query;

    if (!museum) {
        return res.status(400).send({error: 'museum_name is required'});
    }

    const query = `
        SELECT adult_price, child_price, foreigner_price
        FROM museums
        WHERE name = ?;`;

    db.get(query, [museum], (err, row) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (!row) {
            return res.status(404).json({error: `Item not found IN database {${museum}}`});
        }
        res.json(row); // Assuming there is only one price record per museum
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
