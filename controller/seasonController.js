// Import db
const { create } = require('lodash');
const db = require('../db/queries');

function getNewSeason(req, res) {
  res.render('season', { title: 'Season Form' });
}

const insertSeason = async (req, res) => {
  try {
    const result = await db.insertSeason(req.body.season);
    console.log(result);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Internal Server Error');
  }
};

const createNewSeason = async (req, res) => {
  //
  const { season } = req.body;
  try {
    res.render('uniqueSeason', {
      title: 'Unique Season',
      value: season,
    });
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getNewSeason,
  createNewSeason,
};
