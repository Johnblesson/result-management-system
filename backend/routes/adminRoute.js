const express = require('express');
const router = express.Router();
const authController = require('../controllers/adminController');

// Routes
router.get('/', authController.welcomeMessage);

router.get('/signup', (req, res) => {
  res.render(data);
});

router.post('/signup', authController.adminSignup);

router.post('/login', authController.adminLogin);

module.exports = router;
