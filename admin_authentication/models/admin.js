const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: false },
    password: { type: String, required: false },
});

const AdminCredential = mongoose.model('adminCredentials', adminSchema);

module.exports = AdminCredential;