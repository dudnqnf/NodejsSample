var xhr;

function getXMLHttpRequest(){
	if(window.XMLHttpRequest){ //IE7 이상, 모든 브라우저,
		return new XMLHttpRequest;
	} else{
		return new ActiveXobject("Microsoft.XMLHTTP");
	}
}

function sendProcess(url, params, callback, method){
	xhr = getXMLHttpRequest();
	var httpMethod = method ? method : 'GET';
	if (httpMethod != 'GET' && httpMethod != 'POST'){
		httpMethod = 'GET';
	}
	var httpParams = "";
	if (params != null && params != ""){
		for(var key in params){
			if(httpParams == ""){
				httpParams = key + "=" + encodeURIComponent(params[key]);
				// 예) name=홍길동
			} else {
				httpParams += "&" + key + "=" + encodeURIComponent(params[key]);
			}
		}
	}
	var httpUrl = url;
	if(httpMethod == "GET" && httpParams != ""){
		httpUrl += "?" +httpParams;
	}
	xhr.open(httpMethod, httpUrl, true);
	if(httpMethod=="POST"){
		xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
	}
	xhr.onreadystatechange = callback;
	xhr.send(httpMethod == "POST" ? httpParams : null);
}

