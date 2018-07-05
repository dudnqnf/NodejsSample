var mysql = require("mysql");
var async = require("async");

var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '1234',
	database: 'test'
});

exports.index = function(req, res){
  	async.waterfall([
  		function(callback) {
  			pool.getConnection(function(err, conn){
  				conn.query("select distinct(list) from ex1", [], function(err, results1){
  					//console.log('results1',results1);
  					conn.release();
  					callback(null, results1);
  				});
  			});
  		},
  		function(arg1, callback){
		//console.log("arg1", arg1);
			var a = 0;
			var arr = [];
			async.each(arg1, function(item, callback){
				//console.log("item", item);
				pool.getConnection(function(err, conn) {
					if(err) console.err("err", err);
					conn.query("select word from ex1 where list=?", [item.list], function(err, results){
						if(err) console.err("err", err);
						//console.log("results", results)
						var words = [];
						for(var i = 0; i < results.length; i++) {
							//console.log("results["+i+"].word", results[i].word);
							words[i] = results[i].word;
						}
						arr[a] = {"list":item.list, 'words':words};
						a++;
						conn.release();
						callback(null, arr);
					});
				});
			})
		}
	],
	function(err, result){
		console.log('result', result);
		//res.send(result);
		res.render('index', { title: 'Express' });
	}
	);
	
};

exports.test = function(req, res){
	pool.getConnection(function(err, conn){
		conn.query("select list, word from ex1 order by list", [], function(err, results){
			console.log("results", results);
			var arr = [];
			var words = [];
			var curr = '';
			var prev = '';
			for(var i =0, j = 0; i<results.length; i++){
				curr = results[i].list;
				if(curr != prev){
					console.log("X", curr + ":" + results[i].word);
					prev = curr;
					words = [];
					arr[j] = {"list":curr, words:words};
					words.push(results[i].word);
					j++;	//단어장이 다를때
				} else {
					console.log("O", curr + ":" + results[i].word);
					words.push(results[i].word);
				}
			}
			conn.release();
			console.log("arr", arr);
			res.json({arr:arr});
		});
	});
};

