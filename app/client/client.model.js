var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var clientSchema = new Schema({
  email: String,
  name: String,
  phone: String,
  client_email: String,
  address: String,
  projects: Array,
  products: Array
});

module.exports = mongoose.model('Client', clientSchema);
