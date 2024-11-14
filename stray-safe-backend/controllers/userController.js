const { use } = require("../routes/userRoutes");

const signup = async(req, res) => {
    const database = req.database;
    const { name, email, password, contact_number	} = req.body;
    console.log(req.body)
    database.query('INSERT INTO users(name, email, password, contact_number,created_at, updated_at) VALUES (?, ?, ?, ?, ?, ? )', ["testname", email, password, contact_number, new Date(), new Date()], (error, results) => {
        if (error) {
            console.error('Error executing MySQL query', error);
            res.status(500.).send('Internal Server Error');
          } else {
            res.send('User Registered');
          }


    }  )
    
    // database.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, password], (err, results) => {
    //     res.send(results)
    // });
    // res.send(req.body)
}

const login = async(req, res) => {
    const database = req.database;
    const { username, password } = req.body;

    console.log(req.body)

    database.query('SELECT * FROM users WHERE username = ? AND password_hash = ?', [username, password], (err, results) => {
        res.send(results)
    });
}

module.exports = {
    login,
    signup
}