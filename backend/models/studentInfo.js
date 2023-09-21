const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true }
});

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: false },
    contact: { type: String, required: true },
    gpa: { type: Number, required: true },
    subjects: [subjectSchema]
});

const Student = mongoose.model('StudentsInfo', studentSchema);

module.exports = Student;