const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Serve Pterodactyl Panel frontend
app.use(express.static(path.join(__dirname, 'panel')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel', 'index.html'));
});

// API Route to Check Wings Status
app.get('/api/status', (req, res) => {
    exec("pgrep wings", (err, stdout) => {
        res.json({ status: stdout ? "Wings is running!" : "Wings is NOT running!" });
    });
});

// Install & Start Wings
exec("bash install_wings.sh", (err, stdout, stderr) => {
    if (err) {
        console.error(`Error installing Wings: ${stderr}`);
    } else {
        console.log(`Wings installed: ${stdout}`);
    }
});

app.listen(port, () => {
    console.log(`Dragon Panel is running on port ${port}`);
});
