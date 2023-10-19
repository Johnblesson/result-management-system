const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const contactController = require('../controllers/contactController');

// Apply the studentAuthMiddleware to protect the student routes
// const studentAuthMiddleware = require('../middleware/studentAuth')
// router.use(studentAuthMiddleware);

// Login
router.post('/login', studentController.login);

// GET all students
router.get('/', studentController.getAllStudents);

// GET a single student by ID
router.get('/:id', studentController.getStudentById);

// Update a student by ID
router.put('/:id', studentController.updateStudentById);

// Partially update a student by ID
router.patch('/:id', studentController.partiallyUpdateStudentById);

// Delete a student by ID
router.delete('/:id', studentController.deleteStudentById);

// Update student password
router.post("/updatepassword", studentController.updatedPassword);

// Create a new contact form submission
router.post('/submit', contactController.submitContactForm);

module.exports = router;
