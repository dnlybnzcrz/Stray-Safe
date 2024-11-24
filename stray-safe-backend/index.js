const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');

dotenv.config();

const app = express();
const userRouter = require('./routes/userRoutes');

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
});

const database = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASS,
	database: process.env.DATABASE,
	ssl: {
		cs: fs.readFileSync('DigiCertGlobalRootCA.crt.pem')
	}
});

database.connect((err) => {
	if (err) {
		console.log("Error connecting to db");
	} else {
		console.log("Connected to db");
	}
})

app.use(cors({ origin: "*", credentials: true }))
app.use(express.json());
app.use((req, res, next) => {
	req.database = database;
	next();
})

app.use('/api/user', userRouter);
app.get('/', (req, res) => {
	res.send('Hello World');
});