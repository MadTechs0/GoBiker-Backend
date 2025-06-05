const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    userName: {type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true },
    phone: {type: String, required: false, unique: true, sparse:true},
    password: {type: String, required: true },
    role: {type: String, default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
