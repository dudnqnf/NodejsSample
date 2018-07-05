var mongoose = require('mongoose');
var createDate = require('../plugins/createDate');
var valideEmail = require('../helpers/validate/email');

var schema = mongoose.Schema({
	_id: {type:String, lowcase:true, trim:true, validate:validEmail},
	name: {first:String, last:String},
	salt: {type:String, required:true},
	hash: {type:String, required:true},
});

schema.plugin(createDate);
schema.virtual('fullname').get(function(){
	return this.name.first + ' ' + this.name.last;
});

module.exports = mongoose.model('User', schema);