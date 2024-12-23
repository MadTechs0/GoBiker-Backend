const mongoose = require('mongoose');

const commentsSchemma = new mongoose.Schema({
    postId: {type:String, required:true},
    commenterId: {type:String, required:true},
    comment: {type:String, required:true},
})