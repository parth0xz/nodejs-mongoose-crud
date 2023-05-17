var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
	title: String
});

module.exports = mongoose.model('Profile', ProfileSchema);