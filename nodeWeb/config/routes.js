var Index=require("../app/controllers/index");
var Movie=require("../app/controllers/movie");
var User=require("../app/controllers/user");
var Comment=require("../app/controllers/comment");

module.exports=function(app){
	//获取用户信息
	app.use(function(req,res,next){
		var _user=req.session.user;
		res.locals.user=_user;
		next();
	})
	//首页
	app.get("/",Index.index)

	//用户
	app.post("/user/signup",User.signup)
	app.post("/user/signin",User.signin)
	app.get("/signin",User.showSignin)
	app.get("/signup",User.showSignup)
	app.get("/logout",User.logout)
	app.get("/admin/user/list",User.signinRequired,User.adminRequired,User.list)
	
	//电影
	app.get("/movie/:id",Movie.detail)
	app.post("/admin/movie/new",User.signinRequired,User.adminRequired,Movie.save)
	app.get("/admin/movie/list",User.signinRequired,User.adminRequired,Movie.list)
	app.get("/admin/movie",User.signinRequired,User.adminRequired,Movie.new)
	app.get("/admin/movie/update/:id",User.signinRequired,User.adminRequired,Movie.update)
	app.delete("/admin/movie/list",User.signinRequired,User.adminRequired,Movie.del)

	//评论
	app.post("/comment/save",User.signinRequired,Comment.save);
}