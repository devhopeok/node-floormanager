var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var distributorSchema = new Schema({
  email: String,
  name: String,
  phone: String,
  distributor_email: String,
  fax: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  sales_name: String,
  sales_phone: String,
  sales_email: String,
  image: String
});

module.exports = mongoose.model('Distributor', distributorSchema);
