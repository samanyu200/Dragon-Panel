const express = require('express');
const path = require('path');
const app = express();

// Automatically detect the PORT (for GitHub Codespaces & CodeSandbox)
const PORT = process.env.PORT || 3000;

// Serve static files from the "panel" directory
app.use(express.static(path.join(__dirname, 'panel')));

// Handle root URL (redirects to index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'panel', 'index.html'));
});

// Start the server and log the URL (for Codespaces)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Dragon Panel is running on:`);
    console.log(`🌍 Local: http://localhost:${PORT}`);
    
    if (process.env.CODESPACES) {
        console.log(`🔗 GitHub Codespaces: https://${process.env.CODESPACE_NAME}-3000.githubpreview.dev`);
    }
});
