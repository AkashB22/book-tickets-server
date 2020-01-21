let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let movieSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('movie', movieSchema)