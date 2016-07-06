var Movie=require("../models/movie");
//首页
module.exports.index=function(req,res){
	console.log(req.session.user);
	Movie.fetch(function(err,movies){
		if(!!err){
			console.log(err);
		}else{
			res.render("index",{
				title:"imooc 首页",
				movies:movies
			})
		}
	})
}