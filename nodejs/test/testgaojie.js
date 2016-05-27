var pending=(function(){
	var count=0;
	return function(callback){
		count++;
		return function(){
			count--;
			if(count==0){
				callback();
			}
		}
	}
}())

var done=pending(function(){
	console.log("all is over");
})

done();