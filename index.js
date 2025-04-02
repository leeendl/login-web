const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve the dashboard HTML file
app.post('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

// Validate Grow ID login
app.post('/player/growid/login/validate', (req, res) => {
    const { _token, growId, password } = req.body;
    const token = Buffer.from(`_token=${_token}&growId=${growId}&password=${password}`).toString('base64');
    res.send(`{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`);
});

// Close validation window
app.post('/player/validate/close', (req, res) => {
    res.send('<script>window.close();</script>');
});

// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
