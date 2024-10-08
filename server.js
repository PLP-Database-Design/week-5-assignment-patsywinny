const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

//connection
const db = mysql.createConnection(
    {
        host: process.env.db_host,
        user: process.db_user,
        password: process.env.db_password,
        database: process.env.db_name
    }
);
// testing connection
db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } 
    else {
      console.log('Connected to the MySQL database');
      connection.release();
    }
  });
  
  app.use(express.json());

//   question one
app.get('/patients', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

//   question 2
app.get('/providers', (req, res) => {
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

//   question 3
app.get('/patients/:first_name', (req, res) => {
    const firstName = req.params.first_name;
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(sql, [firstName], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

//   question 4
app.get('/providers/specialty/:provider_specialty', (req, res) => {
    const specialty = req.params.provider_specialty;
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(sql, [specialty], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

//   listen the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost: ${PORT}`);
});