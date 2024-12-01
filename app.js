const express = require('express');
const app = express();
require('dotenv').config();
const path = require('node:path');

// Import routers
const indexRouter = require('./routes/indexRouter');

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define routes
app.get('/', indexRouter);

const port = process.env.PORT;

// Start server
app.listen(port, () => {
  console.log('Server running on port ', port);
});
