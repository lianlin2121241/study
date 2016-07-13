$(function(){
    $(window).on("scroll",function(){
    	if($(window).scrollTop() == $(document).height() - $(window).height()){
    		$(".navbar").hide();
    	}else{
    		$(".navbar").show();
    	}
    	console.log($("body").scrollTop());
    })
})