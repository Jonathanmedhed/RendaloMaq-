const express = require('express');
const connectDB = require('./config/db');
const app = express();
// Connect Database
connectDB();
//Init middleware
app.use(express.json({ extended: false }));
// Define Routes
app.get('/', (req, res) => res.send('API Running'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
// Export app to use it in tests
module.exports = app;
