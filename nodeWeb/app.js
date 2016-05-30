var express=require("express");
var bodyParser=require("body-parser");
var port=process.env.ROPT||3000;
var app=express();
app.use(bodyParser.urlencoded({extended:false}));

app.set("views","./views");
app.set("view engine","jade");
app.listen(port);

app.get("/",function(req,res){
	res.render("index",{
		title:"imooc 首页"
	})
})
app.get("/movie/:id",function(req,res){
	console.log(req.query.id);
	console.log(req.query.date);
	res.render("detail",{
		title:"imooc 详情页"
	})
})
app.get("/admin/list",function(req,res){
	res.render("list",{
		title:"imooc 列表页"
	})
})
app.get("/admin/movie",function(req,res){
	res.render("admin",{
		title:"imooc 管理页"
	})
})
//app.get("/jquery-1.8.3",function(req,res){
//	res.render("jquery-1.8.3",{
//		title:"imooc 管理页"
//	})
//})

app.post("/post",function(req,res){
	console.log(req.body.id);
	console.log(req.body);
	console.log(req.body.date);
	res.send('Post Over');
})

app.all("/all",function(req,res){
	console.log(req.query.id);
	console.log(req.query.date);
	res.send('Post Over');
})

console.log("imooc started on port"+port);