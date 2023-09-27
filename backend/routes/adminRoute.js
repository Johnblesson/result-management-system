const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const studentController = require('../controllers/studentController');

// Routes
router.get('/', adminController.welcomeMessage);

router.get('/signup', (req, res) => {
  res.render(data);
});

router.post('/signup', adminController.adminSignup);

router.post('/login', adminController.adminLogin);

// Create a new student
router.post('/createstudent', studentController.createStudent);

router.post("/createnotice", adminController.createNotice);

router.get("/getnotice", adminController.getNotices);


module.exports = router;
