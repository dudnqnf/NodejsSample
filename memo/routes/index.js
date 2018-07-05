
/*
 * GET home page.
 */

 var mysql = require("mysql");

 var connection = mysql.createConnection({
 	host: "localhost",
 	port: "3306",
 	user: "root",
 	password: "1234",
 	database: "test"
 })

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.sel = function(req, res){
	connection.query("SELECT _id, write, content, mtime FROM memo", function(err, rows){
		console.log('결과=', rows);
		res.json(rows);
	}
}