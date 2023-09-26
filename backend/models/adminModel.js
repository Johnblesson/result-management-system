const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: { type: String, required: false },
    password: { type: String, required: false, minLength: 6 },
});

const AdminCredential = mongoose.model('adminCredentials', usersSchema);

module.exports = AdminCredential;
