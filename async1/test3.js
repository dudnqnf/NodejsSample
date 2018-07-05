var async = require("async");

async.waterfall([
	function(callback){
		console.log("첫번째 함수 실행됨");
		callback(null, 'one', 'two');
	},
	function(arg1, arg2, callback){
		console.log("두번째 함수 실행됨");
		console.log(arg1);
		console.log(arg2);
		callback(null, 'three');
	},
	function(arg1, callback){
		console.log("세번쨰 함수 실행됨");
		console.log(arg1);
		callback(null, 'done');
	}
],
	function(err, result){
		if(err) console.error("err", err);
		console.log("result", result);
	}
);