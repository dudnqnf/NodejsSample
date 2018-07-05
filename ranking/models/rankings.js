var mongoose = require("mongoose");
var Ranking = new mongoose.Schema({
	udid: String,
	facebook_id: String,
	user_id: String,
	rank: Number,
	user_level: Number,
	user_magic: Number,
	user_skill: Number,
	score: Number,
	del_yn: {type: String, default: 'N'},
	regdate: {type: Date, default: Date.now} 
});
module.exports = { Ranking: Ranking }