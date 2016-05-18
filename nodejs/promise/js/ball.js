var ball0=document.querySelector(".ball0");
var ball1=document.querySelector(".ball1");
var ball2=document.querySelector(".ball2");

function animateFun (ball,distance,cb) {
	setTimeout(function(){
		var marginLeft=parseInt(!!ball.style.marginLeft?ball.style.marginLeft:0,10);
		if(marginLeft==distance){
			!!cb&&cb();
			return;
		}
		if(marginLeft<distance){
			marginLeft++;
		}else{
			marginLeft--;
		}
		ball.style.marginLeft=marginLeft+"px";
		animateFun(ball,distance,cb);
	},13)
}

/*animateFun(ball0,100,function(){
	animateFun(ball1,200,function(){
		animateFun(ball2,300,function(){
			animateFun(ball2,150,function(){
				animateFun(ball1,150,function(){
					animateFun(ball0,150,function(){
						
					})
				})
			})
		})
	})
})*/

var Promise=window.Promise;
function PromiseAnimateFun(ball,distance){
	return new Promise(function(resolve,reject){
		function _animateFun () {
			setTimeout(function(){
				var marginLeft=parseInt(!!ball.style.marginLeft?ball.style.marginLeft:0,10);
				if(marginLeft==distance){
					resolve("执行完了");
					return;
				}
				if(marginLeft<distance){
					marginLeft++;
				}else{
					marginLeft--;
				}
				ball.style.marginLeft=marginLeft+"px";
				_animateFun();
			},13)
		}
		_animateFun();
	})
}

PromiseAnimateFun(ball0,100)
	.then(function(data){
		console.log(data);
		return PromiseAnimateFun(ball1,200)
	})
	.then(function(){
		return PromiseAnimateFun(ball2,300)
	})
	.then(function(){
		return PromiseAnimateFun(ball2,150)
	})
	.then(function(){
		return PromiseAnimateFun(ball1,150)
	})
	.then(function(){
		return PromiseAnimateFun(ball0,150)
	})