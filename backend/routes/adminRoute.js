const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const studentController = require('../controllers/studentController');

router.get('/', adminController.welcomeMessage);
router.post('/signup', adminController.adminSignup);
router.post('/login', adminController.adminLogin);

router.post("/createnotice", adminController.createNotice);
router.get("/getnotice", adminController.getNotices);

// Create a new student
router.post('/createstudent', studentController.createStudent);

// GET all students
router.get('/getstudents', studentController.getAllStudents);

// GET a single student by ID
router.get('/getstudent/:id', studentController.getStudentById);

// Update a student by ID
router.put('/putstudent/:id', studentController.updateStudentById);

// Partially update a student by ID
router.patch('/patchstudent/:id', studentController.partiallyUpdateStudentById);

// Delete a student by ID
router.delete('/deletestudent/:id', studentController.deleteStudentById);

module.exports = router;
