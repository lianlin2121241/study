var User=require("../models/user");
//注册用户
module.exports.signup=function(req,res){
	var userObj=req.body;
	User.findOne({name:userObj.name},function(err,user){
		!!err&&console.log(err);
		if(!!user){
			console.log(user);
			res.redirect("/signin");
		}else{
			var _user;
			_user=new User(userObj)
			_user.save(function(err,user){
				!!err&&console.log(err);
				res.redirect("/signin");
			})
		}
	})
	
}
//登录
module.exports.signin=function(req,res){
	var userObj=req.body;
	var name=userObj.name;
	var password=userObj.password;
	User.findOne({name:name},function(err,user){
		!!err&&console.log(err);
		if(!user){
			console.log("not has user")
			return res.redirect("/signup");
		}
		user.comparePassword(password,function(err,isMatch){
			!!err&&console.log(err);
			if(isMatch){
				console.log("password is match");
				req.session.user=user;
				res.redirect("/");
			}else{
				console.log("password is not match");
				res.redirect("/signin");
			}
		})
	})
	
}
//登录页
module.exports.showSignin=function(req,res){
	res.render("signin",{
		title:"登录页面"
	})
	
}
//注册页
module.exports.showSignup=function(req,res){
	res.render("signin",{
		title:"注册页面"
	})
	
}
//注销
module.exports.logout=function(req,res){
	delete req.session.user;
	res.redirect("/");
}
//获取用户列表
module.exports.list=function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}
		res.render("userlist",{
			title:"imooc 用户列表页",
			users:users
		})
	})
}