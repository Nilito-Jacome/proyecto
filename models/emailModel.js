const pool = require('../config/db');

const getAllEmails = async () => {
  const result = await pool.query('SELECT * FROM emails');
  return result.rows;
};

const createEmail = async (user_id, sender, addressee, subject, body) => {
  const result = await pool.query(
    'INSERT INTO emails (user_id, sender, addressee, subject, body) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user_id, sender, addressee, subject, body]
  );
  return result.rows[0];
};

module.exports = {
  getAllEmails,
  createEmail,
};
