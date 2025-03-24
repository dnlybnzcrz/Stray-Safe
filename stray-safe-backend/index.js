const express = require('express');
const MySQL = require('mysql2');
const bodyParser = require('body-parser');
const { Expo } = require('expo-server-sdk');
const multer = require('multer');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const expo = new Expo();

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
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.database = database;
  next();
});

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/data', require('./routes/dataRoutes'));
app.use('/api/post', require('./routes/postRoutes'));

// ✅ Store push token in MySQL
app.post('/api/register-token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'No token provided' });

  database.query(
    'INSERT INTO push_tokens (token) VALUES (?) ON DUPLICATE KEY UPDATE token=?',
    [token, token],
    (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ success: true, message: 'Token registered successfully' });
    }
  );
});

// ✅ Fetch stored tokens
app.get('/api/get-tokens', (req, res) => {
  database.query('SELECT token FROM push_tokens', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'No registered tokens' });

    const tokens = results.map((row) => row.token);
    res.json({ tokens });
  });
});

// ✅ Send push notification
app.post('/api/send-notification', async (req, res) => {
  database.query('SELECT token FROM push_tokens', async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'No registered tokens' });

    const messages = results.map(({ token }) => ({
      to: token,
      sound: 'default',
      title: 'New Alert!',
      body: 'You have a new notification.',
      data: { extraData: 'Some data' },
    }));

    try {
      const chunks = expo.chunkPushNotifications(messages);
      for (let chunk of chunks) {
        await expo.sendPushNotificationsAsync(chunk);
      }
      res.json({ success: true, message: 'Notifications sent' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send notification' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});