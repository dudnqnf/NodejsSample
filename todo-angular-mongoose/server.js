var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/test");

app.configure(function() {
	app.use(express.static(__dirname + "/public"));
	app.use(express.logger("dev"));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

var Todo = mongoose.model("Todo", {text:String, done:Boolean});

app.get("/api/todos", function(req, res){
	Todo.find(function(err, todos) {
		if(err) {res.send(err)};
		res.json(todos);
	});
});

app.post("/api/todos", function(req, res) {
	Todo.create({text:req.body.text, done:false}, function(err, todo){
		if(err) {res.send(err)};
		Todo.find(function(err, todos){
			if(err) {res.send(err)};
			res.json(todos);
		})
	});
});

app.delete("/api/todos/:todo_id", function(req, res){
	Todo.remove({_id:req.params.todo_id}, function(err, todo) {
		if(err) {res.send(err);}
		Todo.find(function(err, todos){
			if(err) {res.send(err)};
			res.json(todos);
		})
	})
});

app.get("*", function(req, res) {
	//res.sendfile("./public/index.html");
	res.redirect("/index.html")
});

app.listen(port);
console.log("서버가 " + port + "포트에서 실행중입니다.");