var generic_pool = require("generic-pool");
var mysql = require("mysql");

var pool = generic_pool.Pool({
	name : 'abc',
	create : function(callback) {
		var config = {
			host : "localhost",
			port : "3306",
			user : "root",
			password : "1234",
			database : "test"
		};
		var client = mysql.createConnection(config);
		client.connect(function(err){
			if(err) console.error("err", err);
			callback(err, client);
		});
	},
	destroy: function(client){
		client.end();
	},
	min: 2,
	max: 10,
	idleTimeoutMillis: 300000,	//사용 안할시 자동으로 끊어주는 시간 5분
	log: true
});

process.on("exit", function(){
	pool.drain(function(){
		pool.destroyAllNow();
	});
});

exports.write = function(data, callback) {
	pool.acquire(function(err, conn){
		if(err) {console.error("err", err);}
		conn.query("insert into board(writer, title, content, pwd,hit,regdate) values(?,?,?,?,0,now())", data, function(err, result){
			callback(err, result);
		});
		pool.release(conn);
	});
};

exports.lists = function(page, callback){
	pool.acquire(function(err, conn) {
		if(err) console.error("err", err);
		conn.query("select count(*) cnt from board", [], function(err, results) {
			if(err) console.error("err", err);
			console.log("results", results);
			var size = 10;
			var begin = (page-1) * size;
			var cnt = results[0].cnt;
			var totalPage = Math.ceil(cnt/size);
			var pageSize =10;
			var totalBlock = Math.ceil(totalPage / pageSize);
			var currentBlock = Math.ceil(page / pageSize);
			var startPage = (currentBlock-1) * pageSize+1;
			var endPage = startPage + (pageSize-1);
			if(endPage > totalPage){
				endPage = totalPage;
			}
			var max = cnt - ((page-1)*size);
			conn.query("select * from board order by num desc limit ?, 10", [begin, size], function(err, results){
				if(err) console.log("err",err);
				console.log("results",results);
				var datas = {
					title: "게시판 리스트",
					data: results,
					page: page,
					pageSize: pageSize,
					startPage: startPage,
					endPage: endPage,
					totalPage: totalPage,
					max: max
				};
				callback(err, datas);
			});	//query limit
		});	//query count
		pool.release(conn);
	});	//pool
};

exports.read = function(num, callback) {
	pool.acquire(function(err, conn){
		if(err) console.error("err", err);
		conn.query("update board set hit=hit+1 where num=?", [num], function(err,results){
			if(err) console.error("err", err);
			conn.query("select * from board where num=?", [num],function(err,results){
				if(err) console.error("err", err);
				callback(err, results);
			});
		});
		pool.release(conn);
	});
};

exports.updateform = function(num, callback){
	pool.acquire(function(err, conn){
		if(err) console.error("err", err);
		conn.query("select * from board where num=?",[num], function(err,results){
			if(err) console.error("err", err);
			callback(err, results);
		});
		pool.release(conn);
	});
};

exports.update = function(data, callback){
	pool.acquire(function(err, conn){
		if(err) console.error("err", err);
		conn.query("update board set writer=?, title=?, content=? where num=? and pwd=?",data, function(err, results){
			if(err) console.error("err", err);
			callback(err, results);
		});
		pool.release(conn);
	});
};

exports.insert300 = function(callback){
	pool.acquire(function(err, conn){
		if(err) console.log("err",err);
		for(var i = 0; i <= 300; i++){
			var writer = "타잔"+i;
			var title = "타잔이 "+i+"원 짜리 칼을...";
			var content = i+"원 짜리 팬티를...";
			var pwd = '1234'
			conn.query('insert into board(writer, title, content,pwd,hit,regdate) values(?,?,?,?,0,now())',[writer,title,content,pwd], function(err, result){
			});
		}
		pool.release(conn);
	})
}