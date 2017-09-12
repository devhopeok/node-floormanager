var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var distributorSchema = new Schema({
  email: String,
  name: String,
  phone: String,
  distributor_email: String,
  password: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  managed_by_store: Boolean,
  managed_by_manufacturer: Boolean
});

module.exports = mongoose.model('Distributor', distributorSchema);
