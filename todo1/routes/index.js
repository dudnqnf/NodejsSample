
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
  res.render('index', { title: 'Express' });
};