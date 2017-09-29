var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orderitemSchema = new Schema({
  order_id: String,
  product_id: String,
  count: Number,
  cost: String,
  total: String
});

module.exports = mongoose.model('Orderitem', orderitemSchema);
