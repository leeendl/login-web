const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to allow cross-origin requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Middleware to log requests
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.post('/player/login/dashboard', (req, res) => {
    res.sendFile(__dirname + '/public/html/dashboard.html');
});

app.post('/player/growid/login/validate', (req, res) => {
    const { _token, growId, password } = req.body;
    const token = Buffer.from(`_token=${_token}&growId=${growId}&password=${password}`).toString('base64');
    res.json({
        status: 'success',
        message: 'Account Validated.',
        token,
        url: '',
        accountType: 'growtopia'
    });
});

app.post('/player/validate/close', (req, res) => {
    res.send('<script>window.close();</script>');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
