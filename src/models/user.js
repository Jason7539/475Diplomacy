let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    userName: String,
    ip: String
})


var User = mongoose.model('User', userSchema)

module.exports = User
