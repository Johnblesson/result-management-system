const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true }
});

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    class: { type: String, required: true },
    gpa: { type: Number, required: true },
    subjects: [subjectSchema]
});

const Student = mongoose.model('Students', studentSchema);

module.exports = Student;