const { use } = require("../routes/userRoutes");

const signup = async (req, res) => {
  const database = req.database;
  const { username, email, contact_number, password, } = req.body;

  if (!username || !email || !contact_number || !password) {
    res.status(400).send('Invalid Request');
    return;
  }

  database.query(`
        INSERT INTO users (username, password, email, contact_no, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ? )`,
    [username, password, email, contact_number, new Date(), new Date()],
    (error, results) => {

      if (error) {
        console.error('Error executing MySQL query', error);
        res.status(500.).send('Internal Server Error');
      } else {
        res.send({
          message: 'User created successfully'
        });
      }

    });
}

const login = async (req, res) => {
  const database = req.database;
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send('Invalid Request');
    return;
  }

  database.query(`
    SELECT * 
    FROM users 
    WHERE username = ? 
      AND password = ?`,
    [username, password],
    (error, results) => {
      if (error) {
        console.error('Error executing MySQL query', error);
        res.status(500).send('Internal Server Error');
      }

      if (results.length == 0) {
        res.send({
          message: 'Invalid username or password',
        });
      } else {
        const user = results[0];
        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        res.send({
          message: 'Login successful',
          user: user
        });
      }
    });
}

module.exports = {
  login,
  signup
}