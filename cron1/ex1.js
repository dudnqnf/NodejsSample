var cronJob = require("cron").CronJob;
// 초 분 시 일 월 요일
new cronJob("50 * * * * *", function(){
	console.log("cron 실행됨", new Date());
	//작업시킬 함수();
}, null, true);