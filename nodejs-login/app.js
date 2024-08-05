const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'pranoti1',
    password: '1234',
    database: 'nodejs'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM login WHERE user_name = ? AND user_pass = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.sendFile(path.join(__dirname, 'views', 'welcome.html'));
        } else {
            res.send('<h1>Incorrect username or password</h1>');
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
