const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();
const config = require('./config/panel_config.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'dragon-secret', resave: false, saveUninitialized: true }));

// Serve static files
app.use(express.static('panel'));

// Auth middleware
function auth(req, res, next) {
    if (req.session.user) return next();
    res.redirect('/login');
}

// Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel', 'login.html'));
});

// Login POST
app.post('/login', (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json'));
    const user = users.find(u => u.username === req.body.username);

    if (!user) return res.send('User not found');

    if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user;
        return res.redirect('/');
    } else {
        return res.send('Invalid password');
    }
});

// Dashboard
app.get('/', auth, (req, res) => {
    res.sendFile(path.join(__dirname, 'panel', 'dashboard.html'));
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Admin page
app.get('/admin', auth, (req, res) => {
    if (req.session.user.role !== 'admin') return res.send('Access Denied');
    res.sendFile(path.join(__dirname, 'panel', 'admin.html'));
});

// Start server
app.listen(config.port, () => {
    console.log(`${config.panel_name} is running on port ${config.port}`);
});
