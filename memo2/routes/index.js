
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
//  res.render('index', { title: 'Express' });
res.redirect("/index.html");
};


exports.sel = function(req, res){
	connection.query("SELECT _id, writer, content, DATE_FORMAT(mtime, '%Y-%m-%d %H:%i:%s') mtime FROM memo", function(err, rows){
		console.log('결과='+ rows);
		res.json(rows);
	});
};

exports.ins = function(req, res){
	var writer = req.body.writer;
	var content = req.body.content;

	connection.query("INSERT INTO memo(writer,content,mtime) VALUES(?,?,now())", [writer,content], function(err, result){
		if(err) {
			res.json({status:'FAIL',data:req.body});
		}else{
			res.json({status:'success'})
		}
	})
}

exports.upd = function(req, res){
	var _id = req.body._id;
	var content = req.body.content;
	connection.query('UPDATE memo SET content=? WHERE _id=?', [content, _id], function(err){
		if(err){
			console.log(err);
			res.json({status:"FAIL=",data:req.body});
		} else {
			res.json({status:"success"});
		}
	});
}

exports.del = function(req, res){
	var _id = req.body._id;
	connection.query('DELETE FROM memo where _id=?', [_id], function(err){
		if(err){
			console.log(err);
			res.json({status:"FAIL=",data:req.body});
		} else {
			res.json({status:"success"});
		}
	});
}