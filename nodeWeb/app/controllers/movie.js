var Movie=require("../models/movie");
var Comment=require("../models/comment");
var Category=require("../models/category");
var Path=require("path");
var fs=require("fs");
var _=require("underscore");
//查看电影信息
module.exports.detail=function(req,res){
	var id=req.params.id;
	Movie.update({_id:id},{$inc : {pv : 1}},function(err){
		!!err&&console.log(err);
	});
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
//海报上传
module.exports.updatePoster=function(req,res,next){
	var filePoster=req.files.updatePoster;
	console.log(filePoster);
	var filePath=filePoster.path;
	var fileName=filePoster.name;
	var fileType=filePoster.type;
	if(fileName){
		fs.readFile(filePath,function(err,data){
			var time=Date.now();
			!!err&&console.log(err)
			var newPosterName=time+"."+fileType.split("/")[1];
			var fileSavePath=Path.join(__dirname,"../../","public/updateFile/",newPosterName);
			fs.writeFile(fileSavePath,data,function(err,data){
				!!err&&console.log(err)
				req.poster=newPosterName;
				next();
			})
		})
	}else{
		next();
	}
}
//保存电影信息
module.exports.save=function(req,res){
	var movieObj=req.body;
	var id=movieObj._id;
	var poster=req.poster;
	!!poster&&(movieObj.poster=poster);
	//console.log(id);
	var _movie;
	if(id){
		Movie.findById(id,function(err,movie){
			if(!!err){
				console.log(err);
			}
			if (movie.category!=movieObj.category) {
				Category.findById(movie.category,function(err,category){
					!!err&&console.log(err);
					var oldMovies=category.movies;
					for (var i = 0 ; i <oldMovies.length;i++ ) {
						if (oldMovies[i].toString()==movie._id.toString()) {
							category.movies.splice(i,1);
							break;
						}
					}
					category.save(function(err,category){
						!!err&&console.log(err);
					})
				})
				Category.findById(movieObj.category,function(err,category){
				console.log("4");
					!!err&&console.log(err);
					category.movies.push(movieObj._id);
					category.save(function(err,category){
						!!err&&console.log(err);
					})
				})
			}
			_movie= _.extend(movie,movieObj);
			_movie.save(function(err,movie){
				!!err&&console.log(err);
				res.redirect("/movie/"+movie._id)
			})
		})
	}else{
		var categoryName=movieObj.categoryName;
		var categoryId=movieObj.category;
		_movie=new Movie(movieObj)
		_movie.save(function(err,movie){
			!!err&& console.log(err);
			if(!!categoryId){
				console.log("hgfhjklkdh3");
				Category.findById(movieObj.category,function(err,category){
					!!err&&console.log(err);
					category.movies.push(movie._id);
					category.save(function(err,category){
						!!err&&console.log(err);
						res.redirect("/movie/"+movie._id)
					})
				})
			}else if(!!categoryName){
				console.log(movieObj);
				var category=new Category({
					name:categoryName,
					movies:[movie._id]
				})
				category.save(function(err,category){
					!!err&&console.log(err);
					movie.category=category._id;
					movie.save(function(err,movie){
						!!err&&console.log(err);
						res.redirect("/movie/"+movie._id)
					})
				})
			}
		})
	}
}
//获取电影列表信息接口
module.exports.getMovieInfo=function(req,res){
	Movie
		.find({})
		.populate({
			path: 'category'
		})
		.exec(function(err,movies){
			if(err){
				console.log(err);
			}
			res.json({
				title:"imooc 列表页",
				movies:movies
			})
		})
}
//获取电影列表
module.exports.list=function(req,res){
	Movie
		.find({})
		.populate({
			path: 'category'
		})
		.exec(function(err,movies){
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