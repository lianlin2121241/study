var fs=require("fs");

fs.readFile("logo.png",function(err,data_buffer) {
	console.log(Buffer.isBuffer(data_buffer));
	fs.writeFile("logoOld.png",data_buffer,function(err){
		if (err) {console.log(err);}
	});

	var base64string=data_buffer.toString("base64");
	var base64buffer=new Buffer(base64string,"base64");
	console.log(base64string);

	fs.writeFile("logoNew.png",base64buffer,function(err){
		if (err) {console.log(err);}
	});

	console.log(Buffer.compare(data_buffer,base64buffer));
})