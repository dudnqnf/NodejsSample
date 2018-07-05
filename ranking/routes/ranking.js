var db = require("../lib/db_connection.js");
var RankingModel = db.model("Ranking", require("../models/rankings").Ranking);

exports.rankingform = function(req, res){
	res.render('rankingform', {title:"rankingform"});
};

exports.ranking = function(req, res){
	var b = req.body;
	console.log("b", b);
	var query = ({udid: b.udid, user_id: b.user_id});
	RankingModel.findOne(query, function(err, doc){
		if(err) console.error("err", err);
		console.log("doc", doc);
		if(doc == null){
			var rank = new RankingModel(b);
			rank.save(function(err){
				if (err) console.error("err", err);
				res.redirect("/rankinglist");
			});
		} else {
			if(doc.score < b.score) {
				var update = {
					user_skill: b.user_skill,
					user_level: b.user_level,
					user_magic: b.user_magic,
					score: b.score
				};
				doc.update(update, function(err){
					if(err) console.error("err", err);
					console.log("수정된 doc", doc);
					res.json({result:"ok"});
				});
			}else{
				res.redirect("/rankinglist");
			};
		};
	});
};

exports.rankinglist = function(req, res){
	RankingModel.find({del_yn:'N'}).sort({'score':'desc'}).limit(100).exec(function(err, doc){
		if(err) console.error("err", err);
		var len = doc.length;
		for(i=0; i<len; i++){
			doc[i].rank = i + 1;
		}
		console.log(doc);
		res.render("rankinglist", {title:"랭킹 리스트", data:doc});
	});
};