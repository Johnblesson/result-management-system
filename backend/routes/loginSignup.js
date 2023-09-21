const express = require('express');
const router = express.Router()

const bcrypt = require('bcrypt');
require('dotenv').config();
const Credential = require('../models/user');


//Login routes
router.get('/', (req, res) => {
    res.status(201).json({
        "Message": "Welcome to the api",
    })
})

// Signup routes
router.get('/signup', (req, res) => {
  res.render(data);
});

//Password hashing// Setting saltRounds to 10
router.post('/signup', async (req, res) => {
  try {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // Hash the password

     // Store the hashed password in the database
    const data = {
      username: req.body.username,
      password: hashedPassword,
    };
    
    await Credential.insertMany([data]);
    res.send('You have sign up successfully');
  } catch (error) {
    res.send('An error occurred while signing up.');
  }
});

// Login credential
router.post('/login', async (req, res) => {
  try {
    const user = await Credential.findOne({ username: req.body.username });

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
});

module.exports = router;