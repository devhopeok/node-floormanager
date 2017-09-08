var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    username: String,
    email: String,
    type: Number,
    store_id: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);
