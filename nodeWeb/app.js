var express=require("express");
var bodyParser=require("body-parser");
var path=require("path");
var mongoose=require("mongoose");
var Movie=require("./models/movie");
var port=process.env.ROPT||3000;
var app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"bower_components")));

app.set("views","./views/pages");
app.set("view engine","jade");
app.listen(port);

mongoose.connect("mongodb://127.0.0.1")

app.get("/",function(req,res){
	Movie.fetch(function(err,movies){
		if(!!err){
			console.log(err);
		}else{
			res.render("index",{
				title:"imooc 首页",
				movies:movies
				/*movies:[{
				 title:"机械战警",
				 _id:1,
				 poster:"http://pic.58pic.com/58pic/13/45/39/62F58PICE27_1024.jpg"
				 },{
				 title:"机械战警",
				 _id:2,
				 poster:"http://pic.58pic.com/58pic/13/45/39/62F58PICE27_1024.jpg"
				 },{
				 title:"机械战警",
				 _id:3,
				 poster:"http://pic.58pic.com/58pic/13/45/39/62F58PICE27_1024.jpg"
				 }]*/
			})
		}
	})
})
app.get("/movie/:id",function(req,res){
	var id=req.params.id;
	Movie.findById(id,function(err,movie){
		if(!!err){
			console.log(err);
		}else{
			res.render("detail",{
				title:"imooc 详情页",
				movie:movie
				/*movie:{
					flash:"http://static.youku.com/v1.0.0625/v/swf/loader.swf",
					title:"2-3 伪造模板数据跑通前后端交互流程...",
					doctor:"Scott",
					country:"中国",
					language:"汉语",
					year:"2016.06.23",
					summary:"本课程适合从事前端开发 2～3 年，已掌握基础的 html/css/javascript/jQuery 技能，对nodejs、express、mongodb、jade 模板引擎等流行技术有或多或少了解，但实践不多的初中级前端工程师。"
				}*/
			})
		}
	})
})
app.get("/admin/list",function(req,res){
	res.render("list",{
		title:"imooc 列表页",
		movies:[{
			_id:1,
			title:"2-3 伪造模板数据跑通前后端交互流程...",
			doctor:"Scott",
			country:"中国",
			year:"2016.06.23",
			meta:{
				createAt:"2016.06.23"
			}
		},{
			_id:2,
			title:"2-4 伪造模板数据跑通前后端交互流程...",
			doctor:"Scott",
			country:"中国",
			year:"2016.06.23",
			meta:{
				createAt:"2016.06.23"
			}
		},{
			_id:3,
			title:"2-5 伪造模板数据跑通前后端交互流程...",
			doctor:"Scott",
			country:"中国",
			year:"2016.06.23",
			meta:{
				createAt:"2016.06.23"
			}
		}]
	})
})
app.get("/admin/movie",function(req,res){
	res.render("admin",{
		title:"imooc 管理页",
		movie:{
			title:"2-3 伪造模板数据跑通前后端交互流程...",
			doctor:"Scott",
			country:"中国",
			language:"汉语",
			poster:"http://pic.58pic.com/58pic/13/45/39/62F58PICE27_1024.jpg",
			flash:"http://static.youku.com/v1.0.0625/v/swf/loader.swf",
			year:"2016.06.23",
			summary:"本课程适合从事前端开发 2～3 年，已掌握基础的 html/css/javascript/jQuery 技能，对nodejs、express、mongodb、jade 模板引擎等流行技术有或多或少了解，但实践不多的初中级前端工程师。"
		}
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