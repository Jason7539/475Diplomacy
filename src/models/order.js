let mongoose = require('mongoose')

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

var OrderModel = mongoose.model('Order', orderSchema)

//var order = new OrderModel();

//OrderModel.orderInfo = 'Ukraine move Russia'


