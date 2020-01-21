let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let screenSchema = new Schema({
    runningMovie: String,
    totalSeats: Number,
    bookedSeats: Number,
    availableSeats: Number
})
let theatreSchema = new Schema({
    name: String,
    noOfScreens: Number,
    screensDetail: [screenSchema]
});

module.exports = mongoose.model('theatre', theatreSchema)