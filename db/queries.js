const pool = require('./pool');

async function getAllSeasons() {
  const { rows } = await pool.query('SELECT * FROM seasons');
  return rows;
}

async function insertSeason(season) {
  try {
    // Check if seaon is already in db
    const { rows } = await pool.query(
      `SELECT season FROM seasons WHERE season = $1`,
      [season]
    );
    if (rows.length > 0) {
      console.log(`${season} already included`);
      return undefined;
    }
    // Insert new season
    await pool.query('INSERT INTO seasons (season) VALUES ($1)', [season]);
    return console.log(`${season} successfully added`);
  } catch (error) {
    console.error('Error inserting season:', error.message);
  }
}

async function getHolidaysFromSeason(season) {
  try {
    let { rows } = await pool.query(
      `SELECT id FROM seasons WHERE season = $1`,
      [season]
    );

    if (rows.length > 0) {
      const id = rows[0].id;
      const details = await pool.query(
        `SELECT season_id, title, date, description FROM special_days WHERE special_days.season_id = $1`,
        [id]
      );
      if (details.rows.length === 0) {
        return;
      }
      console.log(details.rows);
      return details.rows;
    } else {
      console.log('No matching season found');
    }
  } catch (error) {
    console.error('There was an error retrieving the holiday', error);
  }
}

module.exports = {
  getAllSeasons,
  insertSeason,
  getHolidaysFromSeason,
};
