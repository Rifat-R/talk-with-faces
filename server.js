require('dotenv').config();
const express = require('express');
const http = require('http');

const port = 3000;

const app = express();
app.use('/', express.static(__dirname));

app.get('/api/keys', (req, res) => {
    res.json({
        DID_API_KEY: process.env.DID_API_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        ASSISTANT_ID: process.env.ASSISTANT_ID
    });
});

const server = http.createServer(app);

server.listen(port, async () => {
    console.log(`Server started on port localhost:${port}`)
    const openModule = await import('open');
    openModule.default(`http://localhost:${port}`);
});