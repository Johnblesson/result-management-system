const express = require('express');
const router = express.Router();
const authController = require('../controllers/adminController');

// Routes
router.get('/', authController.welcomeMessage);

router.get('/adminSignup', (req, res) => {
  res.render(data);
});

router.post('/adminSignup', authController.adminSignup);

router.post('/adminLogin', authController.adminLogin);

module.exports = router;