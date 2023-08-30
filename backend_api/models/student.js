const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    class: { type: String, required: true },
    gpa: { type: Number, required: true }
})

module.exports = mongoose.model('Students', studentsSchema)