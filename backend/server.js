const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config();

// Database Connection
const connectDB = require('./database/connection');
connectDB;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Linking the studentRoute and the Admin Credentials (login and signup)
const studentsRouter = require('./routes/studentRoute');
const adminLoginSignup = require('./routes/adminRoute');

// Routes Middlewares
app.use('/api/v1/students', studentsRouter);
app.use('/api/v1/admin', adminLoginSignup);

// Starting server
const PORT = process.env.PORT || 8080
app.listen(PORT, (error) => {
    if (error) {
        console.log('Message: Something went wrong');
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
