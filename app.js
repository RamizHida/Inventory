const express = require('express');
const app = express();
require('dotenv').config();
const path = require('node:path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routers
const indexRouter = require('./routes/indexRouter');
const seasonRouter = require('./routes/seasonRouter');

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define routes
app.use('/', indexRouter);
app.use('/season', seasonRouter);

const port = process.env.PORT;

// 404 Route Handler
app.use((req, res) => {
  // Extract the attempted URL
  const searchedUrl = req.originalUrl;
  res.status(404).render('404', { searchedUrl });
});

// Start server
app.listen(port, () => {
  console.log('Server running on port ', port);
});
