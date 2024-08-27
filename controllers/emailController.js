const emailModel = require('../models/emailModel');

const getAllEmails = async (req, res) => {
  try {
    const emails = await emailModel.getAllEmails();
    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEmail = async (req, res) => {
  const { user_id, sender, addressee, subject, body } = req.body;
  try {
    const newEmail = await emailModel.createEmail(user_id, sender, addressee,subject, body);
    res.status(201).json(newEmail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllEmails,
  createEmail,
};
