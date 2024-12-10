const pool = require('./pool');

async function getAllSeasons() {
  const { rows } = await pool.query('SELECT * FROM seasons');
  return rows;
}

async function insertSeason(season) {
  // Check if seaon is already in db
  const { rows } = await pool.query(
    "SELECT season FROM seasons WHERE season LIKE 'Winter'"
  );
  if (rows.length > 0) {
    return console.log(`${season} already included`);
  }

  await pool.query('INSERT INTO seaons (season) VALUES ($1)', [season]);
  return console.log(`${season} successfully added`);
}

module.exports = {
  getAllSeasons,
  insertSeason,
};
