require("dotenv").config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const user = require('./models/user')


// Connect to Database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Check for errors or connection
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', ()  => console.log("connected to database"))

// To accept Json
app.use(express.json())

const users = []

// setting routes
app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { username: req.body.username, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.username === req.body.username)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

//Start server
const PORT = 3000
app.listen(PORT, (error) => {
    if(error) {
        console.log('Message: Something went wrong')
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})