const bcrypt = require('bcrypt');
const AdminCredential = require('../models/adminModel');

// Controller for the root route
function welcomeMessage(req, res) {
  res.status(201).json({
    Message: 'Welcome to the Admin API',
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

module.exports = {
  welcomeMessage,
  adminSignup,
  adminLogin,
};
