//체크인
exports.checkin = function(req, res){
	var userNo = req.session.userNo;
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;
	var placeName = req.body.placeName;
	var address = req.body.address;
	var storePhone = req.body.storePhone;
	var placeId = req.body.placeId;
	var comment  = req.body.comment;
	var badgeType = req.body.badgeType;
	var myFile = req.files.myFile;
	var stringPlaceId = String(placeId);

	console.log("placeId", placeId);
	console.log("stringPlaceId", stringPlaceId);
	var date = new Date();
	var regdate = date.toFormat('YYYY-MM-DD HH:mm:ss');

	console.log(req.body);
	async.waterfall([
		function(callback){
			async.each(myFile, function(item, callback){	//asyc시작!
				var originalImg;
				var thumbnailImg;
				console.log(item);
				console.log("호출되었습니다.!!!!!!!!!!!!!!!!");
				if(item.originalFilename == ""){
					res.json({"result":"no file"});
				} else {
					var userfolder = path.resolve(__dirname, '..', 'uploads/location_img/', stringPlaceId);
					if(! fs.existsSync(userfolder)){
						fs.mkdirSync(userfolder);
					}
					var name = item.name+".jpg";
					var srcpath = item.path;
					var destpath = path.resolve(userfolder, name);
					originalImg = "http://54.187.60.176:8000/location_img/"+stringPlaceId+"/"+name;
					thumbnailImg = "http://54.187.60.176:8000/location_img/"+stringPlaceId+"/"+name.substring(0,name.lastIndexOf('.'))+"-thumbnail"+name.substring(name.lastIndexOf('.'));
					console.log("destpath", destpath);
					var is = fs.createReadStream(srcpath);
					var os = fs.createWriteStream(destpath);
					is.pipe(os);
					is.on("end", function(){
						fs.unlinkSync(srcpath);
						var srcimg = destpath;
						var idx = destpath.lastIndexOf('.');
						var filename = destpath.substring(0, idx);
						var ext = destpath.substring(idx);
						var destimg = filename + '-thumbnail' + ext;
						easyimage.resize({src:srcimg, dst:destimg, width:500, height:500}, function(err, image) {
							if(err) console.error('err', err);
							console.log("image", image);
						});
					});
				}
				callback(null, originalImg, thumbnailImg);
			}
		},
			function(Name){
				pool.acquire(function(err, conn){
					conn.query("select placeId from DIPLE_LOCATION_INFO where placeId=?", [placeId], function(err, result){
						if(result[0]){
							conn.query("update DIPLE_LOCATION_INFO set checkinNum=checkinNum+1 where placeId=?", [placeId], function(err, result){
								if(err) {res.json({"result":"fail"});}
								conn.query("insert into DIPLE_LOCATION_IMG(placeId, userNo, originalImg, thumbnailImg) values(?,?,?,?)", [placeId,userNo,originalImg,thumbnailImg], function(err, result){
									if(err) {res.json({"result":"fail"});}
									conn.query("insert into DIPLE_BADGE_INFO(placeId, badgeType, regdate) values(?,?,?)", [placeId,badgeType,regdate], function(err, result){
										if(err) {res.json({"result":"fail"});}
										conn.query("insert into DIPLE_LOCATION_COMMENT(placeId, userNo, comment, regdate) values(?,?,?,?)", [placeId,userNo,comment,regdate], function(err, result){
											if(err) {res.json({"result":"fail"});}
											conn.query("insert into DIPLE_CHECK_IN(userNo, badgeType, placeId, regdate) values(?,?,?,?)", [userNo,badgeType,placeId,regdate], function(err, result){
												if(err) {res.json({"result":"fail"});}
												conn.query("insert into DIPLE_RECORD_INFO(placeId, userNo, comment,regdate) values(?,?,?,?)", [placeId,userNo,comment,regdate], function(err, result){
													if(err) {res.json({"result":"fail"});}
													console.log("호출됨 2!!!!!!!!!!!");

												});
											});
										});
									});
								});
							});
						}else{
							conn.query("insert into DIPLE_LOCATION_INFO(placeName, address, latitude, longitude, storePhone, badgeId1,regdate) values(?,?,?,?,?,?,?)", [placeName,address,latitude,longitude,storePhone,badgeType,regdate], function(err, result){
								if(err) {res.json({"result":"fail"});}
								conn.query("select placeId from DIPLE_LOCATION_INFO order by placeId desc limit 0,1", [], function(err, place){
									placeId = place[0].placeId;
										conn.query("insert into DIPLE_LOCATION_COMMENT(placeId, userNo, comment, regdate) values(?,?,?,?)", [placeId,userNo,comment,regdate], function(err, result){
										if(err) {res.json({"result":"fail"});}
										conn.query("insert into DIPLE_RECORD_INFO(placeId, userNo, comment,regdate) values(?,?,?,?)", [placeId,userNo,comment,regdate], function(err, result){
											if(err) {res.json({"result":"fail"});}
											conn.query("insert into DIPLE_CHECK_IN(userNo, badgeType, placeId, regdate) values(?,?,?,?)", [userNo,badgeType,placeId,regdate], function(err, result){
												if(err) {res.json({"result":"fail"});}
												conn.query("insert into DIPLE_BADGE_INFO(placeId, badgeType, regdate) values(?,?,?)", [placeId,badgeType,regdate], function(err, result){
													if(err) {res.json({"result":"fail"});}
													conn.query("insert into DIPLE_LOCATION_IMG(placeId, userNo, originalImg, thumbnailImg) values(?,?,?,?)", [placeId,userNo,originalImg,thumbnailImg], function(err, result){
														if(err) {res.json({"result":"fail"});}
														console.log("호출됨 2!!!!!!!!!!!");
													});
												});
											});
										});
									});
								});
							});
						}
					});
					pool.release(conn);
				});
			}],
		function(err){
			if(err) {res.json({"result":"err"});}
			else {res.json({"result":"success"});}
		});
}