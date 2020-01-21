let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderTicketSchema = new Schema({
    email: String,
    movieName: String,
    theatreName: String,
    noOfSeats : Number
});

module.exports = mongoose.model('order-ticket', orderTicketSchema)