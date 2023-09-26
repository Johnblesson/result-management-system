const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: false },
    score: { type: Number, required: false }
});

const studentSchema = new mongoose.Schema({
    // Personal Info & Credentials
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    middleName: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    contact: { type: String, required: false },
    gpa: { type: Number, required: false },

    // Emmergency Information
    emergencyName: { type: String, required: false },
    emergencyContact: { type: String, required: false },
    emergencyRelation: { type: String, required: false },
    emergencyAddress: { type: String, required: false },

    subjects: [subjectSchema]
});

const Student = mongoose.model('StudentsInfo', studentSchema);

module.exports = Student;