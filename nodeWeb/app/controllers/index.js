var Movie=require("../models/movie");
var Category=require("../models/category");
//首页
module.exports.index=function(req,res){
	Category
		.find({})
		.populate({path: 'movies', options: {limit:5}})
		.exec(function(err,categories){
			if(err){
				console.log(err);
			}
			res.render("index",{
				title:"imooc 列表页",
				categories:categories
			})
		})
}
//查询
module.exports.search=function(req,res){
	var categoryId=req.query.cat;
	var page=parseInt(req.query.p,10);
	var count=2;
	// var currentPage=0;
	// var totalPage=0;
	var index=count*page;
	Category
		.find({_id:categoryId})
		.populate({
			path: 'movies'
		})
		.exec(function(err,categories){
			if(err){
				console.log(err);
			}
			var movies=categories[0].movies;
			movies=movies.slice(index,index+2);
			res.render("search",{
				title:"imooc 查询结果",
				category:categories[0],
				movies:movies,
				currentPage:page,
				totalPage:Math.ceil(categories[0].movies.length/2)
			})
		})
}