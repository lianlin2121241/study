var express=require("express");
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);

server.listen(8080);
console.log("server is run at port 8080");

app.get('/',function(req,res) {
	res.sendfile(__dirname+'/index.html');
})
app.get('/app1.js',function(req,res) {
	res.sendfile(__dirname+'/app1.js');
})

io.sockets.on('connection',function(socket){
	socket.emit('new:msg',"Welcome to AnonBoard");

	socket.on("broadcast:msg",function(data) {
		socket.broadcast.emit('new:msg',data.message);
	})
})