var fs=require("fs");
var http=require("http");
var request=require("request");

http
	.createServer(function(req,res){
		/*fs.readFile("../buffer/logo.png",function(err,data){
			if(err){
				res.end("file is not exist");
				return;
			} else{
				res.writeHeader(200,{"Context-Type":"text/html"});
				res.end(data);
			}

		})*/

		// fs.createReadStream("../buffer/logo.png").pipe(res);

		request("http://static.mukewang.com/static/img/common/logo.png").pipe(res);
	})
	.listen(8090)