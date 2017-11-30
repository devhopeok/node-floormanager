var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orderitemSchema = new Schema({
  order_id: String,
  product_id: String,
  count: Number,
  distributor_id: String
});

module.exports = mongoose.model('Orderitem', orderitemSchema);
