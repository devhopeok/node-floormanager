var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var storeSchema = new Schema({
    email: String, // Creator email of product
    name: String,
    image: String,

    phone: String,
    address: String,
    city: String,
    state: String,
    zip: String,

    employees: String
});

module.exports = mongoose.model('Store', storeSchema);
