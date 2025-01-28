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
      return res.render('seasonError', { message: 'Invalid input' });
    }

    // Insert New Season into db
    const result = await db.insertSeason(season);

    if (typeof result === 'string') {
      return res.render('seasonError', { message: result });
    }

    // If successful, return to home page
    res.redirect('/');
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Internal Server Error');
  }
};

const showSeasonDetails = async (req, res) => {
  try {
    const { season } = req.params;
    const holidayDetails = await db.getHolidaysFromSeason(season);
    // console.log(holidayDetails);
    if (!holidayDetails) {
      return res.render('lonelySeason', { season: season });
    }

    if (season) {
      res.render('seasonDetails', {
        season: season,
        holidayDetails: holidayDetails,
      });
    }
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Internal Server Error');
  }
};

const createNewHoliday = async (req, res) => {
  try {
    const secretPassword = process.env.SECRETPASSWORD;
    const { newHoliday, holidayDesc, password, season } = req.body;
    if (password === secretPassword) {
      console.log('you are a smart duck');
      const result = await db.insertHoliday(season, newHoliday, holidayDesc);

      if (typeof result === 'string') {
        return res.render('seasonError', { message: result });
      }

      res.render('holidaySuccess', { holiday: newHoliday });
    } else {
      res.render('wrongPassword');
    }
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteHoliday = async (req, res) => {
  const holidayTitle = req.params.holidayName;
  const season = req.params.season;
  console.log(season);

  try {
    await db.deleteHoliday(holidayTitle);
    res.redirect(`/season/${season}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting holiday');
  }
};

module.exports = {
  getNewSeason,
  createNewSeason,
  showSeasonDetails,
  createNewHoliday,
  deleteHoliday,
};
