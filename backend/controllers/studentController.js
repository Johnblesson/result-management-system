const bcrypt = require('bcrypt');
const Student = require('../models/studentInfo');

// Controller for the login route
async function login(req, res) {
  try {
    const user = await Student.findOne({ username: req.body.username });

    if (!user) {
      return res.send('User not found');
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      res.status(201).json(
        { message: 'Login successfully'}
        );
    } else {
      res.send('Incorrect password');
    }
  } catch (error) {
    res.send('An error occurred while logging in.');
  }
}

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

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

// Personal Info & Credentials
  const students = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    contact: req.body.contact,
    gpa: req.body.gpa,
    grades: req.body.grades,

// Emmergency Information
    emergencyName: req.body.emergencyName,
    emergencyContact: req.body.emergencyContact,
    emergencyRelation: req.body.emergencyRelation,
    emergencyAddress: req.body.emergencyAddress,
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

    if (req.body.lastName) {
      student.lastName = req.body.lastName;
    }

    if (req.body.middleName) {
      student.middleName = req.body.middleName;
    }

    if (req.body.username) {
      student.username = req.body.username;
    }

    if (req.body.email) {
      student.email = req.body.email;
    }

    if (req.body.password) {
      student.password = req.body.password;
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
  login,
};
