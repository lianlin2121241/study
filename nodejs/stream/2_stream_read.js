var fs=require("fs");
var readStream=fs.createReadStream("music.mp3");
var i=0;

readStream
	.on("data",function(chunk) {
		console.log("load stream");
		console.log(Buffer.isBuffer(chunk));

		// console.log(chunk.toString("utf8"));

		i++;
		readStream.pause();
		console.log("data pause");
		setTimeout(function(){
			readStream.resume();
			console.log("data pause end");
		},10)
	})
	.on("readable",function(){
		console.log("data readable");
	})
	.on("end",function(){
		console.log("data ends");
		console.log(i);
	})
	.on("close",function(){
		console.log("data close");
	})
	.on("error",function(e){
		console.log("data read error"+e)
	})