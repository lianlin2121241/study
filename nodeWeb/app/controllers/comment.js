var Comment=require("../models/comment");
//保存评论信息
module.exports.save=function(req,res){
	var commentObj=req.body;
	console.log(commentObj);
	var movieId=commentObj.movie;

	if(!!commentObj.cid){
		Comment.findById(commentObj.cid,function(err,comment){
			!!err&&console.log(err);
			var reply={
				from:commentObj.from,
				to:commentObj.tid,
				content:commentObj.content
			}
			comment.replys.push(reply);
			comment.save(function(err,comment){
				!!err&&console.log(err);
				res.redirect("/movie/"+movieId);
			})
		})
	}else{
		_comment=new Comment(commentObj)
		_comment.save(function(err,comment){
			!!err&&console.log(err);
			res.redirect("/movie/"+movieId);
		})
	}
}