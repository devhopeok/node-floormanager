var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orderitemSchema = new Schema({
  order_id: String,
  product_id: String,
  product_name: String,
  product_image: String,
  count: Number,
  cost: String,
  total: String,
  dis_id: String,
  dis_phone: String,
  dis_image: String
});

module.exports = mongoose.model('Orderitem', orderitemSchema);
