var async = require("async");

async.series([
	function(callback) {
		console.log("첫번째 함수 실행됨");
		callback(null, 'one');
	},
	function(callback) {
		console.log("두번째 함수 실행됨");
		callback(null, 'two');
	}
],
	function(err, result){
		if(err) console.error("err", err);
		console.log("result", result);
	}
);