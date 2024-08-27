const pool = require('../config/db');

const getAllLabels = async () => {
  const result = await pool.query('SELECT * FROM labels');
  return result.rows;
};

const createLabel = async (name, user_id) => {
  const result = await pool.query(
    'INSERT INTO labels (name, user_id) VALUES ($1, $2) RETURNING *',
    [name, user_id]
  );
  return result.rows[0];
};

module.exports = {
  getAllLabels,
  createLabel,
};
