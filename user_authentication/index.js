const express = require('express');
const app = express();
// const path = require('path');
// const hbs = require('hbs');
const mongoose = require('mongoose');
require('dotenv').config();
const Credential = require('./models/user');
const bcrypt = require('bcrypt');

// const templatePath = path.join(__dirname, './views');

// app.set('view engine', 'hbs');
// app.set('views', templatePath);
// app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
// app.use(express.static('public'));

// Accepting Json
app.use(express.json());

// MongoDB Connection
// Connect to the Mongodb database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check for connection
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongodDB Database...'));

// Routing
//Login routes
app.get('/', (req, res) => {
    res.render()
})

// Signup routes
app.get('/signup', (req, res) => {
  res.render();
});

//Password hashing// Setting saltRounds to 10
app.post('/signup', async (req, res) => {
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
app.post('/login', async (req, res) => {
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

// Starting server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// { naming: `${req.body.username}` }