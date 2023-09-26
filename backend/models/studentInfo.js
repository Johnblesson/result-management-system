const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Personal Info & Credentials
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    middleName: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    contact: { type: Number, required: false },
    gpa: { type: Number, required: false },

    // Emmergency Information
    emergencyContact: {
        emergencyName: { type: String, required: false },
        emergencyContact: { type: String, required: false },
        emergencyRelation: { type: String, required: false },
        emergencyAddress: { type: String, required: false },
    },

    grades: { 
                year: String,
                term1: {
                  subjects: [String],
                  scores: [Number],
                },
                term2: {
                  subjects: [String],
                  scores: [Number],
                },
                term3: {
                  subjects: [String],
                  scores: [Number],
                },
              }
});

const Student = mongoose.model('StudentsInfo', studentSchema);

module.exports = Student;