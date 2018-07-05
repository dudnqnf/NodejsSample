var fs = require("fs");

fs.writeFile("fs_test.txt", "hello world", function(err){
	if(err) {
		console.error('err', err);
	} else {
		for(var i=0;i<1000000000;i++){

		}
		console.log("저장 성공")
	}
});

fs.readFile("fs_test.txt", "utf-8", function(err, data){
	if(err) {console.error('err', err);}
	else {console.log("읽은 내용="+data)}
});