//comment model
var mongoose = require('mongoose');
var objectId = mongoose.Schema.Type.ObjectId;
var createDate = require('../plugins/createDate');

var schema = mongoose.schema({
	text:{type:String, trim:true, validate:validateText},
	post:{type:objectId, index:true};
	author:String
});

function validateText(str){
	return str.length < 250;
}

schema.plugin(createDate);

module.exports = mongoose.mode('Comment', schema);