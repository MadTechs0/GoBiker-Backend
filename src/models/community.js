const mongoose = require('mongoose');

const communitySchemma = new mongoose.Schema({
    ownerId: {type:String, required:true},
    name: {type:String, required:true, unique:true},
    description: {type:String, required:true},
    restricted: {type:Boolean, required:true},
    members: {type:Number, default:1}
}, {timestamps:true});

module.exports = mongoose.model('Community', communitySchemma);