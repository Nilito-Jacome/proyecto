const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await userModel.createUser(email, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
