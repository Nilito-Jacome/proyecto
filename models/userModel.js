const pool = require('../config/db');

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const createUser = async (email, password) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, password]
  );
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  createUser,
};
