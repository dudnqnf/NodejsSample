var express = require('express');
var mysql = require('mysql');
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'1234',
	database:'test'
});
var session = express.session({
	user_id: ""
});


exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.login_post = function(req, res){
	var user_id = req.body.user_id;
	var pwd = req.body.pwd;
	pool.getConnection(function(err, conn){
		if(err) console.log('err', err);
		conn.query('select count(*) cnt from hw2 where user_id=?',[user_id], function(err, result){
			if(err) console.log('err',err);
			console.log(result[0].cnt);
			if(result[0].cnt==0){
				res.send("<script>alert('아이디 정보가 없습니다.');history.back();</script>");
			}
		});
		conn.query('select count(*) cnt from hw2 where user_id=? and pwd=?',[user_id, pwd], function(err, result){
			if(err) console.log('err',err);
			console.log(result[0].cnt);
			if(result[0].cnt==0){
				res.send("<script>alert('비밀번호가 틀렸습니다.');history.back();</script>");
			} else{
				req.session.user_id = user_id;
				res.render("main", {user_id:user_id});
				conn.release();
			}
		});			
	});
	
}

exports.main = function(req, res){
	req.session.user_id = req.body.user_id;
	res.render('main', {user_id:req.session.user_id });
}

exports.signout = function(req, res){
	res.render('signout', { title: 'Express' });
}

exports.signout_post = function(req, res){
	var user_id = req.body.user_id;
	var pwd = req.body.pwd;
	var email = req.body.email;
	var memo = req.body.memo;
	pool.getConnection(function(err, conn){
		if(err) console.log('err', err);
		conn.query('insert into hw2(user_id, pwd, email, memo) values(?,?,?,?)',[user_id,pwd,email,memo], function(err, result){
			if(err) console.log('err',err);
			req.session.user_id = req.body.user_id;
			res.render('main', {user_id:req.session.user_id });
			conn.release();
		});
	});
}

exports.fix_mem = function(req, res){
	var user_id = req.session.user_id;
	pool.getConnection(function(err, conn){
		if(err) console.log('err', err);
		conn.query('select * from hw2 where user_id=?',[user_id], function(err, result){
			if(err) console.log('err',err);
			user_id = result[0].user_id;
			var email = result[0].email;
			var memo =result[0].memo;
			res.render("fix_mem", {user_id:user_id,email:email,memo:memo});
		});
	});
}

exports.fix_mem_post = function(req, res){
	var user_id = req.body.user_id;
	var pwd = req.body.pwd;
	var email = req.body.email;
	var memo = req.body.memo;
	console.log("user_id", user_id);
	console.log("pwd", pwd);
	console.log("email", email);
	console.log("memo", memo);
	pool.getConnection(function(err, conn){
		if(err) console.log('err', err);
		conn.query('update hw2 set pwd=?, email=?, memo=? where user_id=? ',[pwd,email,memo,user_id], function(err, result){
			if(err) console.log('err',err);
			req.session.user_id = user_id;
			res.render('main', {user_id:user_id});
			conn.release();
		});
	});
}

exports.out_mem = function(req, res){
	pool.getConnection(function(err, conn){
		if(err) console.log('err', err);
		conn.query('delete from hw2 where user_id=?',[req.session.user_id], function(err, result){
			if(err) console.log('err',err);
			req.session.user_id = req.body.user_id;
			res.render('index', { title: 'Express'  });
			conn.release();
		});
	});
}

exports.logout = function(req, res){
	req.session.user_id = "";
	res.render("index", { title: 'Express' });
}

exports.id_check = function(req, res){
	var user_id = req.params.user_id;
	pool.getConnection(function(err, conn){
		if(err) console.log('err', err);
		conn.query('select count(*) cnt from hw2 where user_id=?',[user_id], function(err, result){
			if(err) console.log('err',err);
			if(result[0].cnt==0){
				res.send("<script>alert('사용 가능한 아이디 입니다.');history.back();</script>");
			} else {
				res.send("<script>alert('이미 존재하는 아이디 입니다.');history.back();</script>");
			}
		});
	});
}