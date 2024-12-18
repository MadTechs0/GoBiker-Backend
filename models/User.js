const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;