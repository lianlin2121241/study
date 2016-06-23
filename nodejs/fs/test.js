var fs=require("fs");

var src="./source"
fs.readdir(src,function(err,files) {
	if(err) {
		console.log(err);
		return false;
	}
	files.forEach(function(file){
		var fileArr=file.split(".");
		// var newPath=fileArr[0]+"_liml";
		var newPath=fileArr[0].replace("_liml","");
		fs.rename(src+"/"+file, src+"/"+newPath+"."+fileArr[1], function(err){
			if(!err){
				console.log(file+"重命名成功")
			}
			// console.log(a);
		})
		// console.log(fileArr[0]);
	})
})