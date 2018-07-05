var async = require("async");

async.parallel([
	function(callback){
		setTimeout(function(){
			console.log('첫번째 함수 실행');
			callback(null, 'one');
		}, 500);
	},
	function(callback){
		setTimeout(function(){
			console.log('두번째 함수 실행');
			callback(null, 'two');
		}, 100);
	}

],
	function(err, result) {
		if(err) console.error('err', err);
		console.log("result", result);  
	}
);