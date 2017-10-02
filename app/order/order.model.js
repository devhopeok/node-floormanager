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
  install_company: {
    name: String,
    tech_name: String,
    tech_phone: String,
    date: String,
    time: String
  }
});

module.exports = mongoose.model('Order', orderSchema);


