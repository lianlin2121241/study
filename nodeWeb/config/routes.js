var Index=require("../app/controllers/index");
var Movie=require("../app/controllers/movie");
var User=require("../app/controllers/user");

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
	app.get("/admin/userlist",User.list)
	
	//电影
	app.get("/movie/:id",Movie.detail)
	app.post("/admin/movie/new",Movie.save)
	app.get("/admin/list",Movie.list)
	app.get("/admin/movie",Movie.new)
	app.get("/admin/update/:id",Movie.update)
	app.delete("/admin/list",Movie.del)
}