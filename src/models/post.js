const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    createrId: {type:String, required:true},
    communityId: {type:String, required:true},
    title: {type:String, required:true},
    description: {type:String},
    likes: {type:Number, default:0},
    imageUrl: {type:String}
}, {timestamps:true});

module.exports = mongoose.model('Post', postSchema);