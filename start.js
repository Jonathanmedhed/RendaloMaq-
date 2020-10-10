const app = require('./server.js');

// Set port
const PORT = process.env.PORT || 5000;

// Listen to server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
