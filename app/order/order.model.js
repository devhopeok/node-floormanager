var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orderSchema = new Schema({
  email: String,
  customer_id: String,
  product_id: String,
  date: String,
  due_date: String,
  discount: String,
  sales_tax: String,
  shipping_fee: String,
  message: String,
  memo: String
});

module.exports = mongoose.model('Order', orderSchema);
