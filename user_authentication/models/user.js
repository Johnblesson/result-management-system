const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: { type: String, required: false },
    password: { type: String, required: false },
});

const Credential = mongoose.model('credentials', usersSchema);

module.exports = Credential;