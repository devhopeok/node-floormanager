var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var clientSchema = new Schema({
  email: String,
  first_name: String,
  last_name: String,
  phone: String,
  client_email: String,
  address: String,
  zipcode: String,
  projects: Array,
  products: Array
});

module.exports = mongoose.model('Client', clientSchema);
