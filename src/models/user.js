let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    user: String,
    ip: String
})


var User = mongoose.model('User', userSchema)

module.exports = User
