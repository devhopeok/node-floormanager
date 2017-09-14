var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema = new Schema({
  creator_email: String, // Creator email of product
  name: String,
  distributor_email: String,
  material: Number,
  project: Number,
  available: Boolean,
  cost_per_unit: String,
  unit: Number,
  mark_up_percent: Number,
  length: String,
  width: String,
  area: String,
  min_shipping_cost: String,
  flat_fee: String,
  price: String,
  image: String
});

module.exports = mongoose.model('Product', productSchema);
