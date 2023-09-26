const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Create a new contact form submission
router.post('/submit', contactController.submitContactForm);

// Retrieve a list of all contact form submissions
router.get('/list', contactController.getAllContactSubmissions);

module.exports = router;
