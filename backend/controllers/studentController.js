const bcrypt = require('bcrypt');
const Student = require('../models/student');

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
    avatar: req.body.avatar,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleName: req.body.middleName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    contact: req.body.contact,
    gender: req.body.gender,
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
    if (req.body.avatar) {
      student.avatar = req.body.avatar;
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

    if (hashedPassword) {
      student.hashedPassword = req.body.password;
    }
    // ... (similar updates for other fields)

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update student password
async function updatedPassword(req, res) {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError =
        "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const student = await Student.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();
    if (student.passwordUpdated === false) {
      student.passwordUpdated = true;
      await student.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: student,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

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
  updatedPassword,
  login,
};
