const pool = require('./pool');

async function getAllSeasons() {
  const { rows } = await pool.query('SELECT * FROM seasons');
  return rows;
}

module.exports = {
  getAllSeasons,
};
