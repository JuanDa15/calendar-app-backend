const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./db/config.js');
require('dotenv').config();

// Create express server
const app = express();

// DB
dbConnection();

// CORS - Cross Origin Resource Sharing
app.use(cors());
// Public directory
app.use(express.static('public'));

// Read and write of the body
app.use(express.json());

// Routes
app.use('/api/v1/auth/', require('./routes/auth.js'));
app.use('/api/v1/event/', require('./routes/event.js'));
// listen request
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running in port: ${process.env.PORT || 3000}`);
});

module.exports = app;
