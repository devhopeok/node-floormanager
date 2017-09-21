var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orderitemSchema = new Schema({
  order_id: String,
  customer_id: String,
  product_id: String,
  amount: Number,
  price: String
});

module.exports = mongoose.model('Orderitem', orderitemSchema);
