const bcrypt = require('bcrypt');
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
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const data = {
      username: req.body.username,
      password: hashedPassword,
    };

    await AdminCredential.insertMany([data]);
    res.send('You have signed up successfully');
  } catch (error) {
    res.send('An error occurred while signing up.');
  }
}

// Controller for the login route
async function adminLogin(req, res) {
  try {
    const user = await AdminCredential.findOne({ username: req.body.username });

    if (!user) {
      return res.send('User not found');
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (passwordMatch) {
      res.status(201).send('Login successfully');
    } else {
      res.send('Incorrect password');
    }
  } catch (error) {
    res.send('An error occurred while logging in.');
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
      noticeFor,
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

// Get Notice
async function getNotices (req, res) {
  try {
    // Retrieve all notices from the database
    const notices = await Notice.find();

    // Return the list of notices as a JSON response
    res.status(200).json(notices);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

module.exports = {
  welcomeMessage,
  adminDashboard,
  adminSignup,
  adminLogin,
  createNotice,
  getNotices,
};
