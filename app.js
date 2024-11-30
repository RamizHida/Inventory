const express = require('express');
const app = express();
require('dotenv').config();

//  Import db
const db = require('./db/queries');

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const seasons = await db.getAllSeasons();
    if (seasons.length === 0) {
      return res.status(404).send('No seasons found.');
    }
    res.status(200).send(seasons[0].season);
  } catch (error) {
    console.error('Error fetching seasons: ', error);
    res.status(500).send('Internal Server Ewrror');
  }
});

const port = process.env.PORT;

// Start server
app.listen(port, () => {
  console.log('Server running on port ', port);
});
