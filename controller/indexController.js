//  Import db
const db = require('../db/queries');

const getHomeView = async (req, res) => {
  try {
    const seasons = await db.getAllSeasons();
    if (seasons.length === 0) {
      return res.status(404).send('No seasons found.');
    }
    res
      .status(200)
      .render('index', { title: 'Home View', seasons: seasons[0].season });
  } catch (error) {
    console.error('Error fetching seasons: ', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getHomeView,
};
