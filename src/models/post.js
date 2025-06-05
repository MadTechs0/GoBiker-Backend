const mongoose = require('mongoose');
const Community = require('./community');
const postSchema = new mongoose.Schema({
    creatorId: {type:mongoose.Schema.Types.ObjectId, ref: 'Profile', required:true},
    communityId: {type:mongoose.Schema.Types.ObjectId, ref: 'Community', required:true},
    title: {type:String, required:true},
    description: {type:String},
    likes: {type:Number, default:0},
    comments: {type: Number, default:0},
    hasImage: {type: Boolean, default:false},
},  {timestamps:true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});
postSchema.virtual('imageUrl').get(function () {
    return null;
});

module.exports = mongoose.model('Post', postSchema);