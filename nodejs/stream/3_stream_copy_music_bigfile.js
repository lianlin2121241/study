var fs=require("fs");

var rs=fs.createReadStream("music.mp3");
var ws=fs.createWriteStream("stream_copy_music.mp3");

/*rs
	.on("data",function(chunk) {
		console.log("read chunk");
		ws.write(chunk);
	})
	.on("end",function(){
		console.log("read end");
		ws.end();
	})*/

rs
	.on("data",function(chunk) {
		console.log("read chunk");
		if(ws.write(chunk)==false){
			console.log("not write chunk");
			rs.pause();
		}
	})
	.on("end",function(){
		console.log("read end");
		ws.end();
	})

ws
	.on("drain",function(){
		console.log("write end");
		rs.resume();
	})