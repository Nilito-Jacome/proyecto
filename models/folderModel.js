const pool = require('../config/db');

const getAllFolders = async () => {
  const result = await pool.query('SELECT * FROM folders');
  return result.rows;
};

const createFolder = async (name, user_id) => {
  const result = await pool.query(
    'INSERT INTO folders (name, user_id) VALUES ($1, $2) RETURNING *',
    [name, user_id]
  );
  return result.rows[0];
};

module.exports = {
  getAllFolders,
  createFolder,
};
