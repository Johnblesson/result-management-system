const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes
router.get('/', authController.welcomeMessage);

router.get('/signup', (req, res) => {
  res.render(data);
});

router.post('/signup', authController.signup);

router.post('/login', authController.login);

module.exports = router;
