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

animateFun(ball0,100,function(){
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
})