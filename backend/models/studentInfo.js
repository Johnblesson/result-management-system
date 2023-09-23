const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: false },
    score: { type: Number, required: false }
});

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    contact: { type: String, required: false },
    gpa: { type: Number, required: false },
    subjects: [subjectSchema]
});

const Student = mongoose.model('StudentsInfo', studentSchema);

module.exports = Student;