let mongoose = require('mongoose')

//mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/diplomacy",{ useNewUrlParser: true })

let orderSchema = new mongoose.Schema({
    country1: String,
    country2: String,
    order:  String
})

orderSchema.virtual('orderInfo').get(function() {
    return this.country1 + ' ' + this.order + ' ' + this.country2
})

orderSchema.virtual('orderInfo').set(function(order) {
    
    let str = order.split(' ')
    
    this.country1 = str[0]
    this.order = str[1]
    this.country2 = str[2]
})

var Order = mongoose.model('Order', orderSchema)

module.exports = Order

//var order = new OrderModel();

//OrderModel.orderInfo = 'Ukraine move Russia'


