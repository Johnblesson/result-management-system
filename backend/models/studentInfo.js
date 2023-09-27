const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // Personal Info & Credentials
    avatar: { type: String },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    middleName: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    contact: { type: Number, required: false },
    gender: { type: String, required: false },

    // Emmergency Information
    emergencyInfo: {
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