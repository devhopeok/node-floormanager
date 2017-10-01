var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orderSchema = new Schema({
  email: String,
  client_id: String,
  date: String,
  due_date: String,
  discount: String,
  sales_tax: String,
  shipping_fee: String,
  message: String,
  memo: String,
  total_price: String,
  step: Number,
  attach_image: String,
  company_name: String,
  company_tech_name: String,
  company_tech_phone: String,
  company_date: String,
  company_time: String
});

module.exports = mongoose.model('Order', orderSchema);


