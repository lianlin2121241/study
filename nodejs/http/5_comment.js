var http=require("http");
var querystring=require("querystring");

/*微博测试
var postData=querystring.stringify({
	location:'v6_content_home',
	appkey:'',
	style_type:1,
	pic_id:'',
	text:"node测试",
	pdetail:'',
	rank:0,
	rankid:'',
	module:'stissue',
	pub_source:'main_',
	pub_type:'dialog',
	_t:0,
})

var options={
	hostname:"weibo.com",
	port:80,
	// path:"/aj/mblog/add?ajwvr=6&__rnd=1463110917721",
	path:"/aj/mblog/addddddd",
	mathod:"POST",
	headers:{
		'Accept':,
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded',
		'Cookie':'SINAGLOBAL=9864843229297.549.1445325917816; wb_publish_vip_2723435992=1; TC-Ugrow-G0=5e22903358df63c5e3fd2c757419b456; wvr=6; TC-V5-G0=52dad2141fc02c292fc30606953e43ef; TC-Page-G0=1bbd8b9d418fd852a6ba73de929b3d0c; wb_bub_hot_2723435992=1; _s_tentry=login.sina.com.cn; Apache=7911763140000.403.1463109868583; ULV=1463109869280:20:1:1:7911763140000.403.1463109868583:1461111436552; SUS=SID-2723435992-1463110792-XD-915a6-8cf0f347fc9c5fb80cf3b308c56e18e5; SUE=es%3D3aeeb417d0294029257153fb4134c10e%26ev%3Dv1%26es2%3D3a69ea00dd9d34ff140ce9341a7fccba%26rs0%3Dx%252BtebOrBJ6DhegdbXFUTVd0hU3sX9bQL31gOZo56ihknm3sEG9LCH6f%252F8WAxnJIADfOIy2hhSLD8A%252FrOIvEx1AJgd2n0zYfwXzYvDfxFeDUUNIpMgKXGELhvdsaMm7xsFvDe0Bix%252BjSTvZMVyIMoAWTDTU1%252FVEGc8mZ6MLykOkc%253D%26rv%3D0; SUP=cv%3D1%26bt%3D1463110792%26et%3D1463197192%26d%3Dc909%26i%3D18e5%26us%3D1%26vf%3D%26vt%3D%26ac%3D%26st%3D0%26uid%3D2723435992%26name%3Dlimingle0703%2540sina.com%26nick%3D%25E8%25BD%25AC%25E8%25A7%2592%25E9%2581%2587%25E5%2588%25B0%25E7%2588%25B1%26fmp%3D%26lcp%3D2016-05-13%252011%253A39%253A45; SUB=_2A256MTzYDeRxGeRJ6VEV8yvFwj6IHXVZRykQrDV8PEJbuNNeaCGVkm5JAwIRSIKJXBZWVtJl44ZLYfzT7Ng.; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhlVENffLhcsmTxPxlmLyc95NHD95QES0z0Shef1K.E; SUHB=03o0f_-SGihSlM; ALF=1494646791; SSOLoginState=1463110792; UOR=www.html580.com,widget.weibo.com,login.sina.com.cn',
		'Host':'weibo.com',
		'Origin':'http://weibo.com',
		'Referer':'http://weibo.com/u/2723435992/home?wvr=5',
		'User-Agent':'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}*/

/*qq空间
var postData=querystring.stringify({
	qzreferrer:'http://user.qzone.qq.com/452843930/infocenter?ptsig=BSKMGsjD1v-je6vU202cneQWWgv4Wf*5mCrR4AaI2ek_&t=0.3598738529253751',
	topicId:'V12h04TP06KhEN_NDR09EmJH1BANVdnoFkBqgAAAAAAAAA!_1463107751776_4',
	feedsType:100,
	inCharset:'utf-8',
	outCharset:'utf-8',
	plat:'qzone',
	source:'ic',
	hostUin:'529091060',
	isSignIn:'',
	platformid:'52',
	uin:'452843930',
	format:'fs',
	ref:'feeds',
	content:'好可爱的宝宝啊',
	richval:'',
	richtype:'',
	private:0,
	paramstr:1
})

var options={
	hostname:"photo.qzone.qq.com",
	port:80,
	path:"/cgi-bin/common/cgi_add_piccomment_v2?g_tk=488678544",
	mathod:"POST",
	headers:{
		'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Cache-Control':'max-age=0',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded',
		'Cookie':'RK=6X2uGx5sEp; pgv_pvi=5576640512; randomSeed=874410; pgv_info=ssid=s7484829780; pgv_pvid=3526823464; o_cookie=452843930; zzpaneluin=; zzpanelkey=; ptui_loginuin=452843930; ptisp=ctc; ptcz=3ba2ed9bc0117746fef31ff037d9cc753adaca887d3226c2372d1aa750c40478; pt2gguin=o0452843930; uin=o0452843930; skey=@3WF8PTLnM; p_uin=o0452843930; p_skey=2NSUUhETowOS7qLoRo-2S*BIQ371kL5WGVaiSVYBFJQ_; pt4_token=a4YOBblQ3U9fxqg-tDaXVnoqmznwRFWq5Eys7bbL4yE_; qzone_check=452843930_1463118660; Loading=Yes; qzspeedup=sdch; qqmusic_uin=; qqmusic_key=; qqmusic_fromtag=; qzmusicplayer=qzone_player_452843930_1463118705011; QZ_FE_WEBP_SUPPORT=1; cpu_performance_v8=2; blabla=dynamic',
		'Host':'photo.qzone.qq.com',
		'Origin':'http://user.qzone.qq.com',
		'Referer':'http://user.qzone.qq.com/452843930/infocenter?ptsig=BSKMGsjD1v-je6vU202cneQWWgv4Wf*5mCrR4AaI2ek_&t=0.3598738529253751',
		'Upgrade-Insecure-Requests':1,
		'User-Agent':'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
	}
}*/

var postData=querystring.stringify({
	'params.loginName':'nodetest1',
	'params.username':'lilili',
	'params.jobNo':'100002',
	'params.deptName':'fwef',
	'params.telephone':'13828293847',
	'params.isAdmin':0,
	'params.registType':0
})

var options={
	hostname:"172.27.107.6",
	port:8080,
	path:"/tdv/user/insertUser.action",
	mathod:"POST",
	headers:{
		'Accept':'*/*',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'JSESSIONID=65A38939D4242DBC04D3CCD24AF3B16F',
		'Host':'172.27.107.6:8080',
		'Origin':'http://172.27.107.6:8080',
		'Referer':'http://172.27.107.6:8080/tdv/pages/user.jsp',
		'User-Agent':'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req=http.request(options,function(res){
	console.log("Status:"+res.statusCode);
	console.log("options"+JSON.stringify(options));
	console.log("headers"+JSON.stringify(res.headers));
	var buffer="";
		console.log(Buffer.isBuffer(res));
		console.log(res.toString());
	res.on("data",function(chunk){
		buffer+=chunk;
		console.log(Buffer.isBuffer(chunk));
		// console.log(typeof chunk);
	})
	res.on("end",function(){
		console.log("发布完成");
		console.log(buffer.toString());
	})
})
req.on("error",function(e){
	console.log("发布失败"+e.message);
})
console.log(postData);
req.write(postData);
req.end();