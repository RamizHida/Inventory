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
      const duplicate = `${season} is already included in seasons`;
      return duplicate;
    }
    // Insert new season
    await pool.query('INSERT INTO seasons (season) VALUES ($1)', [season]);
    console.log(`${season} successfully added`);
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

    // if (rows.length > 0) {
    //   const id = rows[0].id;
    //   const details = await pool.query(
    //     `SELECT season_id, title, date, description FROM special_days WHERE special_days.season_id = $1`,
    //     [id]
    //   );

    if (rows.length > 0) {
      const id = rows[0].id;
      const details = await pool.query(
        `SELECT title, date, description FROM special_days WHERE season_id = $1`,
        [id]
      );
      if (details.rows.length === 0) {
        return;
      }
      return details.rows;
    } else {
      console.log('No matching season found');
    }
  } catch (error) {
    console.error('There was an error retrieving the holiday', error);
  }
}

async function insertHoliday(season, holidayName, holidayDesc) {
  try {
    // Check if holiday is already in db
    const { rows } = await pool.query(
      `SELECT title FROM special_days WHERE title = $1`,
      [holidayName]
    );
    console.log('season isss: ', season);

    if (rows.length > 0) {
      const duplicate = `${holidayName} is already included`;
      return duplicate;
    }

    // Insert new holiday
    const date = new Date('2024-01-01T00:00:00');
    const season_id = await pool.query(
      `SELECT id FROM seasons WHERE season = $1`,
      [season]
    );
    //
    const id = season_id.rows[0].id;
    await pool.query(
      `INSERT INTO special_days (season_id, title, date, description) VALUES ($1, $2, $3, $4)`,
      [id, holidayName, date, holidayDesc]
    );
    console.log(`${holidayName} successfully added`);
  } catch (error) {
    console.error('Error inserting holiday:', error.message);
  }
}

async function deleteHoliday(holidayName) {}

module.exports = {
  getAllSeasons,
  insertSeason,
  getHolidaysFromSeason,
  insertHoliday,
  deleteHoliday,
};
