// Import db
const db = require('../db/queries');

function getNewSeason(req, res) {
  res.render('season', { title: 'Season Form' });
}

const createNewSeason = async (req, res) => {
  try {
    const { season } = req.body;

    // remove white spaces
    season.trim();

    // Validate input
    if (!season || typeof season !== 'string' || season.trim().length < 4) {
      return res.render('seasonError');
    }

    // Insert New Season into db
    const result = await db.insertSeason(season);

    // Insert New Season into db

    if (!result) {
      return res.render('seasonError');
    }

    res.redirect('/');
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getNewSeason,
  createNewSeason,
};
