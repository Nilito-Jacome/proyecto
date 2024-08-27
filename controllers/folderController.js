const folderModel = require('../models/folderModel');

const getAllFolders = async (req, res) => {
  try {
    const folders = await folderModel.getAllFolders();
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createFolder = async (req, res) => {
  const { name, user_id } = req.body;
  try {
    const newFolder = await folderModel.createFolder(name, user_id);
    res.status(201).json(newFolder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllFolders,
  createFolder,
};
