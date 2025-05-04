const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('AccessFlow API is running');
});

module.exports = app;