const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const studentController = require('../controllers/studentController');

// Apply the adminAuthMiddleware to protect the admin routes
// const adminAuthMiddleware = require('../middleware/adminAuth'); 
// router.use(adminAuthMiddleware);

// All the routes here requires administrator privileges
router.get('/', adminController.welcomeMessage);
router.get('/dashboard', adminController.adminDashboard);
router.post('/signup', adminController.adminSignup);
router.post('/login', adminController.adminLogin);

// Get & Post Notice
router.post("/createnotice", adminController.createNotice);
router.get("/getnotice", adminController.getNotices);

// Create a New Student
router.post('/createstudent', studentController.createStudent);

// GET all Students
router.get('/getstudents', studentController.getAllStudents);

// GET a single Student by ID
router.get('/getstudent/:id', studentController.getStudentById);

// Update a Student by ID
router.put('/putstudent/:id', studentController.updateStudentById);

// Partially Update a Student by ID
router.patch('/patchstudent/:id', studentController.partiallyUpdateStudentById);

// Delete a Student by ID
router.delete('/deletestudent/:id', studentController.deleteStudentById);

// Update Student Password
router.post("/updatepassword", studentController.updatedPassword);

module.exports = router;