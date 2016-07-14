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
	var page=parseInt(req.query.p,10)||0;
	var count=2;
	var q=req.query.q;
	// var currentPage=0;
	// var totalPage=0;
	var index=count*page;
	if(categoryId){
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
					keyword:categories[0].name,
					movies:movies,
					query:"cat="+categoryId,
					currentPage:page,
					totalPage:Math.ceil(categories[0].movies.length/2)
				})
			})
	}else{
		Movie.find({title:new RegExp(q+".*","i")})
			.exec(function(err,movies){
				if(err){
					console.log(err);
				}
				movies=movies.slice(index,index+2);
				res.render("search",{
					title:"imooc 查询结果",
					keyword:q,
					movies:movies,
					query:"q="+q,
					currentPage:page,
					totalPage:Math.ceil(movies.length/2)
				})
			})
	}
}