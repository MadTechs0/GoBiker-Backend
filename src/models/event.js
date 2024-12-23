const mongoose = require('mongoose');

const eventSchemma = new mongoose.Schema({
    organizerId: {type:String, requierd:true},
    headId: {type:String, required:true},
    title: {type:String, required:true},
    time: {type:Date, required:true},
    location: {type:String, required:true},
    details: {type:String, required:true}
});

module.exports = mongoose.model('Event', eventSchemma);