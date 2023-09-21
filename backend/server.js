const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require("dotenv").config()

// Database Connection
const connectDB = require('./database/connection')
connectDB;

// Middleware
app.use(bodyParser.json())
app.use(cors())

const studentsRouter = require('./routes/students')
const loginSignup = require('./routes/loginSignup')
const adminLoginSignup = require('./routes/adminRoute')

app.use('/api/students', studentsRouter)
app.use('/api/users', loginSignup)
app.use('/api/admin', adminLoginSignup)

// Starting server
const PORT = process.env.PORT || 8080
app.listen(PORT, (error) => {
    if (error) {
        console.log('Message: Something went wrong')
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})