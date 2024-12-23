const { required } = require('joi');
const mongoose = require('mongoose');

const communitySchemma = new mongoose.Schema({
    ownerId: {type:String, required:true},
    name: {type:String, required:true, unique:true},
    description: {type:String, required:true}
}, {timestamps:true});

module.exports = mongoose.model('Community', communitySchemma);