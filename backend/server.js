require("dotenv").config()
const express = require("express")
const app = express()

const connectDB = require('./database/connection')

connectDB;

// To accept Json
app.use(express.json())

const studentsRouter = require('./routes/students')
const loginSignup = require('./routes/loginSignup')

app.use('/api/students', studentsRouter)
app.use('/api/users', loginSignup)

// Starting server
const PORT = process.env.PORT || 8080
app.listen(PORT, (error) => {
    if (error) {
        console.log('Message: Something went wrong')
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})