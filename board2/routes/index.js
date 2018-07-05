
/*
 * GET home page.
 */
var pool = require("../models/dbpool");

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.writeform = function(req,res){
	res.render('writeform',{title:'글 쓰기'});
};

exports.write = function(req,res){
	console.log('req.body', req.body);
	var writer = req.body.writer;
	var pwd = req.body.pwd;
	var title = req.body.title;
	var content = req.body.content;
	var data = [writer, title, content, pwd];
	pool.write(data, function(err, result) {
		if(result.affectedRows == 1){
			res.json({result:"ok"});
			//res.redirect("/list");
		} else {
			res.json({result:'fail'});
		}
	});
};

exports.list = function(req, res){
	var page = req.params.page;
	if(page == undefined){
		page=1;
	}
	res.redirect("/list/"+page);
};


exports.lists = function(req, res){
	var page = req.params.page;
	//console.log('page',page);
	page = parseInt(page, 10);
	pool.lists(page, function(err, datas){
		res.render("list", datas);
	});
};



exports.read = function(req, res){
	var num = req.params.num;
	var page = req.params.page;
	pool.read(num, function(err, results){
		res.render("read", {title:"게시판 읽기",data:results[0],page:page});
	});
};



exports.updateform = function(req, res) {
	var num = req.params.num;
	var page = req.params.page;
	pool.updateform(num,function(err, results){
		res.render('updateform', {title:'게시판수정',data:results[0], page:page})
	});
};


exports.update = function(req, res) {
	var num = req.body.num;
	var writer = req.body.writer;
	var pwd = req.body.pwd;
	var title = req.body.title;
	var content = req.body.content;
	var page = req.body.page;
	var data = [writer, title, content, num, pwd];
	pool.update(data, function(err, result){
		if(result.affectedRows == 1){
			res.redirect("/list/"+page);
		} else {
			res.send('<script>alert("비밀번호가 틀려서 되돌아갑니다.");history.back();</script>');
		}
	});
};



exports.write300 = function(req, res){
	insert300();
	res.send("<head><meta charset='utf-8'><script>alert('300');location.href='/list';</script></head>")
}

function insert300(){
	pool.insert300(function(err, result){
		if(result.affectedRows == 1){
			res.redirect("/list/"+page);
		} else {
			res.json({result:"ok"});
		}
	})
};

/*
exports.del = function(req, res) {
	var num = req.body.num;
	var pwd = req.body.pwd;
	var page = req.body.page;
	pool.getConnection(function(err, conn){
		conn.query("delete from board where num=? and pwd=?", [num, pwd], function(err, result){
			if(result.affectedRows == 1){
				res.redirect("/list/"+page);
			} else {
				res.send('<script>alert("비밀번호가 틀려서 되돌아갑니다.");history.back();</script>');
			}
			res.json({result:"success"});
		});
	});
}

*/


/* 날짜 형식 시작 */
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
/* 날짜 형식 끝 */
/* 예제
//2011년 09월 11일 오후 03시 45분 42초
console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));
//2011-09-11
console.log(new Date().format("yyyy-MM-dd"));
//'11 09.11
console.log(new Date().format("'yy MM.dd"));
//2011-09-11 일요일
console.log(new Date().format("yyyy-MM-dd E"));
//현재년도 : 2011
console.log("현재년도 : " + new Date().format("yyyy"));
*/