var mongoose = require('mongoose');
var createDate = require('../plugins/createDate');

var schema = mongoose.Schema({
	title:{type:String, trim:true},
	body:String,
	author:{type:String, ref:'User'}
});

schema.statics.findComments = function(id, callback){
	return this.model('Comment').find({post:id}, callback);
};

schema.statics.edit = function(req, callback){
	var id = req.param('id');
	var author = req.session.user;

	var query = {_id:id, author:author};
	var update = {};

	update.title = req.param('title');
	update.body = req.param('body');
	this.update(query, update, function(err, numAffected){
		if(err){
			return callback(err);
		}
		if( 0 === numAffected){
			return callback(new Error('수정 안됨'));
		}

		callback();
	});
};

schema.plugin(createDate);
var Post = mongoose.model('BlogPost', schema);

module.export = Post;