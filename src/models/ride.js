const mongoose = require('mongoose');

const rideSchemma = new mongoose.Schema({
    createrId: {type:String, required:true},
    title: {type:String, required:true},
    startingLocation: {type:String, required:true},
    endingLocation: {type:String, required:true},
    time: {type:Date, required:true},
    gloves: {type:Boolean, required:true},
    helmet: {type:Boolean, required:true},
    jacket: {type:Boolean, required:true},
    notes: {type:String}
},{timestamps:true});

module.exports = mongoose.model('Ride', rideSchemma);