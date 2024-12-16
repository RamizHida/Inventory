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

module.exports = {
  getAllSeasons,
  insertSeason,
};
