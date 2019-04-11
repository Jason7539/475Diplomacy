let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    user: String
},{unique: true})

userSchema.virutal().get(function() {
    return this.user
}

userSchema.virtual().set(function(user) {
    let str = user.split(' ')

    this.user = str[0]
}

var userModel = mongoose.model('User', userSchema)
