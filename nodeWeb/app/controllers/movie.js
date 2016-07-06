var Movie=require("../models/movie");
var _=require("underscore");
//查看电影信息
module.exports.detail=function(req,res){
	var id=req.params.id;
	Movie.findById(id,function(err,movie){
		if(!!err){
			console.log(err);
		}else{
			res.render("detail",{
				title:"imooc 详情页",
				movie:movie
			})
		}
	})
}
//保存电影信息
module.exports.save=function(req,res){
	var id=req.body._id;
	var movieObj=req.body;
	//console.log(id);
	var _movie;
	if(id!="undefined"){
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
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})
		_movie.save(function(err,movie){
			!!err&&console.log(err);
			res.redirect("/movie/"+movie._id)
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
	res.render("admin",{
		title:"imooc 后台录入页",
		movie:{
			title:"",
			doctor:"",
			country:"",
			language:"",
			poster:"",
			flash:"",
			year:"",
			summary:""
		}
	})
}
//更新电影信息
module.exports.update=function(req,res){
	var id=req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			!!err&&console.log(err);
			res.render("admin",{
				title:"imooc 后台管理程序",
				movie:movie
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