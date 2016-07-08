var Movie=require("../models/movie");
var Comment=require("../models/comment");
var Category=require("../models/category");
var _=require("underscore");
//查看电影信息
module.exports.detail=function(req,res){
	var id=req.params.id;
	Movie.findById(id,function(err,movie){
		console.log(movie);
		Comment
			.find({movie:id})
			.populate("from","name")
			.populate("replys.from replys.to","name")
			.exec(function(err,comments){
				console.log(comments);
				if(err){
					console.log(err);
				}
				res.render("detail",{
					title:"imooc 详情页",
					movie:movie,
					comments:comments
				})
			})
	})
}
//保存电影信息
module.exports.save=function(req,res){
	var movieObj=req.body;
	var id=movieObj._id;
	//console.log(id);
	var _movie;
	if(id){
		Movie.findById(id,function(err,movie){
			if(!!err){
				console.log(err);
			}
			_movie= _.extend(movie,movieObj);
			_movie.save(function(err,movie){
				!!err&&console.log(err);
				res.redirect("/movie/"+movie._id)
			})
		})
	}else{
		_movie=new Movie(movieObj)
		_movie.save(function(err,movie){
			!!err&& console.log(err);
			Category.findById(movieObj.category,function(err,category){
				!!err&&console.log(err);
				category.movies.push(movie._id);
				category.save(function(err,category){
					!!err&&console.log(err);
					res.redirect("/movie/"+movie._id)
				})
			})
		})
	}
}
//获取电影列表
module.exports.list=function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render("list",{
			title:"imooc 列表页",
			movies:movies
		})
	})
}
//新建电影信息
module.exports.new=function(req,res){
	Category.fetch(function(err,categories){
		if(err){
			console.log(err);
		}
		res.render("admin",{
			title:"imooc 后台录入页",
			movie:{},
			categories:categories
		})
	})
}
//更新电影信息
module.exports.update=function(req,res){
	var id=req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			Category.fetch(function(err,categories){
				!!err&&console.log(err);
				res.render("admin",{
					title:"imooc 后台管理程序",
					movie:movie,
					categories:categories
				})
			})
		})
	}
}
//删除电影
module.exports.del=function(req,res){
	var id=req.query.id;
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		})
	}
}