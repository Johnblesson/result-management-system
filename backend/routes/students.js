const express = require('express')
const router = express.Router()
const Student = require('../models/studentInfo')

// Getting all
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One student
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student)
})

// Create a new student
router.post('/', async (req, res) => {
  const students = new Student({
    profileImage: req.body.profileImage,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    class: req.body.class,
    gpa: req.body.gpa,
   subjects: req.body.subjects,
  });

  try {
    const newStudent = await students.save()
    res.status(201).json(newStudent)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating Students
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.firstName != null) {
    res.student.firstName = req.body.firstName
  }
  if (req.body.lasttName != null) {
    res.student.lasttName = req.body.lasttName
  }
  try {
    const updatedStudent = await res.student.save()
    res.json(updatedStudent)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting Students
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove()
    res.json({ message: 'Deleted Student' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware
async function getStudent(req, res, next) {
  let student
  try {
    student = await Student.findById(req.params.id)
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.student = student
  next()
}

module.exports = router;