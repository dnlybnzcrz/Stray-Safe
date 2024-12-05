const express = require('express');
const MySQL = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const database = MySQL.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
});

database.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database');
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	req.database = database;

	next();
});

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));
app.use('/api/post', require('./routes/postRoutes'));

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});