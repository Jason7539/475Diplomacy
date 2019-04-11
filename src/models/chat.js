let mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    
message: String
})

chatSchema.virutal().get(function() {
    return this.user
}

chatSchema.virtual().set(function(user) {
    let str = user.split(' ')

    this.user = str[0]
}

var userModel = mongoose.model('User', userSchema)
