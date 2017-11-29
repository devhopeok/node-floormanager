var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var productSchema = new Schema({
  creator_email: String, // Creator email of product
  name: String,
  distributor_email: String,
  distributor_name: String,
  material: String,
  project: String,
  available: Boolean,
  cost: String,
  unit: String,
  mark_up_percent: String,
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
  material_fiber: String,
  pattern: String,
  warr_info: String,
  min_order_size: String,
  distributor_id: String,
  distributor_name: String,
  distributor_phone: String,
  distributor_image: String
});

module.exports = mongoose.model('Product', productSchema);
