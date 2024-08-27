const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

router.get('/', folderController.getAllFolders);
router.post('/', folderController.createFolder);

module.exports = router;
