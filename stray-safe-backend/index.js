const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const userRouter = require('./routes/userRoutes');

var app = express();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});

const database = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
});

database.connect((err) => {
    if(err) {
        console.log("Error connecting to db");
    } else {
        console.log("Connected to db");
    }
})

app.use(cors({ origin: "*", credentials: true}))
app.use(express.json());
app.use((req, res, next) => {
    req.database = database;
    next();
})

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});