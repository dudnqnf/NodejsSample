
/*
 * GET home page.
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var Todo = new mongoose.Schema({
	user_id: String,
	content: String,
	update_at: Date
});
var todoModel = mongoose.model("Todo",Todo);

exports.index = function(req, res){
	todoModel.find({}).sort("-update_at").exec(function(err, todos){
		if(err) console.error("err", err);
		console.log("todos", todos);
		res.render('index', { 
			title: 'Todo App' ,
			todos: todos,
			current: req.params.id
		});
	});
};

exports.create = function(req, res){
	var todo = new todoModel();
	todo.user_id = "hong";
	todo.content = req.body.content;
	todo.update_at = Date.now();
	todo.save(function(err, todo) {
		if(err) console.error("err",err);
		res.redirect("/");
	});
};

exports.edit = function(req, res){
	todoModel.find({user_id:"hong"}).sort("-update_at").exec(function(err, todos){
		if(err) console.error("err", err);
		res.render('edit', { 
			title: 'Todo App' ,
			todos: todos,
			current: req.params.id
		});
	});
};

exports.update = function(req, res){
	todoModel.findById(req.params.id, function(err, todo) {
		if(err) console.error("err", err);
		todo.content = req.body.content;
		todo.update_at = Date.now();
		todo.save(function(err, todo){
			if(err) console.error("err", err);
			res.redirect('/');
		});
	});
};

exports.destroy = function(req, res){
	todoModel.findById(req.params.id, function(err, todo){
		if(err) console.error("err", err);
		todo.remove(function(err, todo){
			if(err) console.error("err", err);
			res.redirect("/")
		});
	});
};