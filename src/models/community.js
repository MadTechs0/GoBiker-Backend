const mongoose = require('mongoose');
const communitySchemma = new mongoose.Schema({
    ownerId: {type:String, required:true},
    name: {type:String, required:true, unique:true},
    description: {type:String, required:true},
    restricted: {type:Boolean, required:true},
    members: {type:Number, default:1}
}, {timestamps:true,
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});
communitySchemma.virtual('bannerUrl').get(function () {
    return null;
})
communitySchemma.virtual('avatarUrl').get(function () {
    return null;
})
module.exports = mongoose.model('Community', communitySchemma);