var Category=require("../models/category");
var _=require("underscore");
//保存电影分类信息
module.exports.save=function(req,res){
	var categoryObj=req.body;
	var id=categoryObj._id
	var _category;
	if(id){
		Category.findById(id,function(err,category){
			if(!!err){
				console.log(err);
			}
			_category= _.extend(category,categoryObj);
			_category.save(function(err,category){
				!!err&&console.log(err);
				res.redirect("/admin/category/list")
			})
		})
	}else{
		_category=new Category(categoryObj)
		_category.save(function(err,movie){
			!!err&&console.log(err);
			res.redirect("/admin/category/list")
		})
	}
}
//获取电影分类列表
module.exports.list=function(req,res){
	Category.fetch(function(err,categories){
		if(err){
			console.log(err);
		}
		res.render("categorylist",{
			title:"imooc 电影分类列表页",
			categories:categories
		})
	})
}

//新建电影分类信息
module.exports.new=function(req,res){
	res.render("category_admin",{
		title:"imooc 电影分类录入页",
		category:{}
	})
}
//更新电影分类信息
module.exports.update=function(req,res){
	var id=req.params.id;
	if(id){
		Category.findById(id,function(err,category){
			!!err&&console.log(err);
			res.render("category_admin",{
				title:"imooc 电影分类录入页",
				category:category
			})
		})
	}
}