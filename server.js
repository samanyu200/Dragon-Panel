const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('panel'));

// Load panel config
const panelConfig = JSON.parse(fs.readFileSync('./config/panel_config.json', 'utf8'));

// Home Page (Login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel', 'index.html'));
});

// Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel', 'dashboard.html'));
});

// Create Server Page
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel', 'create.html'));
});

// API Test
app.get('/api/ping', (req, res) => {
    res.json({ status: "Panel Running" });
});

// Start Panel
app.listen(port, () => {
    console.log(`Panel is running on http://localhost:${port}`);
});
