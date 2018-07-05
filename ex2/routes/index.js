
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hello node' });
};

exports.abc = function(req, res){
  res.render('index', { title: 'Hello abc' });
};

exports.ajax = function(req, res){
	var keyword = req.query.keyword;
	var idx = keyword.indexOf("a");
	var str="";
	if(idx >= 0){
		str = 'AJAX초급,AJAX중급,AJAX고급';
	} else{
		str = "검색어1,검색어2,검색어3";
	}
	res.send(str);
};