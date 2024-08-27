const labelModel = require('../models/labelModel');

const getAllLabels = async (req, res) => {
  try {
    const labels = await labelModel.getAllLabels();
    res.json(labels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createLabel = async (req, res) => {
  const { name, user_id } = req.body;
  try {
    const newLabel = await labelModel.createLabel(name, user_id);
    res.status(201).json(newLabel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllLabels,
  createLabel,
};
