var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema = new Schema({
  creator_email: String, // Creator email of product
  name: String,
  distributor_email: String,
  distributor_name: String,
  material: Number,
  project: Number,
  available: Boolean,
  cost: String,
  unit: Number,
  mark_up_percent: Number,
  length: String,
  width: String,
  area: String,
  min_shipping_cost: String,
  flat_fee: String,
  price: String,
  image: String,
  sku_num: String,
  client_ids: Array,
  color: String,
  protection: String,
  fiber: String,
  pattern: String
});

module.exports = mongoose.model('Product', productSchema);
