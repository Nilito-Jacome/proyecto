const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.get('/', emailController.getAllEmails);
router.post('/', emailController.createEmail);

module.exports = router;
