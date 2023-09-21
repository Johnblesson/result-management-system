const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET all students
router.get('/', studentController.getAllStudents);

// GET a single student by ID
router.get('/:id', studentController.getStudentById);

// Create a new student
router.post('/', studentController.createStudent);

// Update a student by ID
router.put('/:id', studentController.updateStudentById);

// Partially update a student by ID
router.patch('/:id', studentController.partiallyUpdateStudentById);

// Delete a student by ID
router.delete('/:id', studentController.deleteStudentById);

module.exports = router;
