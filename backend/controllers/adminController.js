const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const AdminCredential = require('../models/adminModel');
const Notice = require('../models/notice')

// Controller for the root route
function welcomeMessage(req, res) {
  res.status(201).json({
    Message: 'Welcome to the Admin API',
  });
} 

// Admin Dashboard
function adminDashboard(req, res) {
  res.status(201).json({
    Message: 'Welcome to the admin dashboard!',
  });
}

// Controller for the signup route
async function adminSignup(req, res) {
// Validation checks
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const data = {
      username: req.body.username,
      password: hashedPassword,
    };

// Check for duplicate usernames
  const existingUser = await AdminCredential.findOne({ username: data.username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken. Try something else!!!' });
    }
  
// Ensure the password contains at least one uppercase letter, one lowercase letter, and is at least 6 characters long
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(req.body.password)) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long and contain both uppercase and lowercase letters.',
          });
    }

    await AdminCredential.insertMany([data]);
    res.status(201).json({ message: 'You have signed up successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while signing up.' });
  }
}

// Controller for the login route
async function adminLogin(req, res) {
  try {
    const user = await AdminCredential.findOne({ username: req.body.username });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      res.status(201).json({ message: 'Login successfully' });
    } else {
      res.json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
}

// Create a new notice
async function createNotice (req, res) {
  try {
    const { from, content, topic, date, noticeFor } = req.body;

    const errors = { noticeError: String };
    const exisitingNotice = await Notice.findOne({ topic, content, date });
    if (exisitingNotice) {
      errors.noticeError = "Notice already created";
      return res.status(400).json(errors);
    }
    const newNotice = await new Notice({
      from,
      content,
      topic,
      date,
    });
    await newNotice.save();
    return res.status(200).json({
      success: true,
      message: "Notice created successfully",
      response: newNotice,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

// Get All Notice
async function getNotices(req, res) {
  try {
    // Retrieve all notices from the database
    const notices = await Notice.find();

    res.status(200).json({
      success: true,
      notices: notices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  welcomeMessage,
  adminDashboard,
  adminSignup,
  adminLogin,
  createNotice,
  getNotices,
};
