var Promise=require("bluebird");

function red(){
	console.log("red");
}
function green(){
	console.log("green");
}
function yellow(){
	console.log("yellow")
}

function showColor(timeouts,cb){
	return new Promise(function(resolve,reject){
		setTimeout(function(){
			cb();
			resolve();	
		},timeouts);
	})
}

/*function start(){
	showColor(1000,red)
		.then(function(){
			return showColor(2000,yellow)
		})
		.then(function(){
			return showColor(3000,green)
		})
		.then(function(){
			start();
		})
}
start();*/

/*Generator实现异步*/
function *gen(){
	yield showColor(1000,red);
	yield showColor(2000,green);
	yield showColor(3000,yellow);
}
var iterator=gen();
var step=function(gen,iterator){
	var s=iterator.next();
	if(s.done){
		step(gen,gen());
	}else{
		s.value.then(function(){
			step(gen,iterator);
		})
	}
}

step(gen,iterator);