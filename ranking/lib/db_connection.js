var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/rank');

db.on('connected', function(){
	console.log("Connected to database");
});
db.on("error", function (err){
	console.log("Error! DB connection failed.");
});
db.once("open", function(){
	console.log('DB connection open!');
});
module.exports = db;