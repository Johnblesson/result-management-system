require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

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

const studentsRouter = require('./routes/students')
app.use('/students', studentsRouter)


// Starting server
const PORT = 3000
app.listen(PORT, (error) => {
    if (error) {
        console.log('Message: Something went wrong')
    } else {
        console.log(`Server running on port ${PORT}`)
    }
})