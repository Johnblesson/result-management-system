const Student = require('../models/studentInfo');

// Controller for GET all students
async function getAllStudents(req, res) {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Controller for GET a single student by ID
async function getStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Controller for creating a new student
async function createStudent(req, res) {
  const students = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    gpa: req.body.gpa,
    subjects: req.body.subjects,
  });

  try {
    const newStudent = await students.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Controller for updating a student by ID
async function updateStudentById(req, res) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated student
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Controller for partially updating a student by ID
async function partiallyUpdateStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (req.body.firstName) {
      student.firstName = req.body.firstName;
    }
    // ... (similar updates for other fields)

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Controller for deleting a student by ID
async function deleteStudentById(req, res) {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudentById,
  partiallyUpdateStudentById,
  deleteStudentById,
};
