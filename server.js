// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allow CORS for all requests

// Serve static files (if you have an HTML file)
app.use(express.static('public')); // Assuming your HTML is in a folder named "public"

// Simple root route
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js server!');
});

// Mock database for demonstration
let users = [];

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    
    // Simple validation (should be more robust in production)
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Store user in the "database"
    users.push({ username, email, password });
    res.status(201).json({ message: 'User signed up successfully' });
  
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
