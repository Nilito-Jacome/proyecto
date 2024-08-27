const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');

router.get('/', labelController.getAllLabels);
router.post('/', labelController.createLabel);

module.exports = router;
