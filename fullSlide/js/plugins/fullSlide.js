(function($){
	var fullSlide=(function(){
		function fullSlide(elem,options){
			this.elem=elem;
			this.settings=$.extend(true, $.fn.fullSlide.defults,options||{});
			this.init();
		}
		fullSlide.prototype={
			init:function(){

			}
		}
		return fullSlide;
	})()
	$.fn.fullSlide=function(options){
		return $(this).each(function(index, el) {
			var fullslide=$(this).data("data-fullslide"),
				elem=$(this);
			if(!fullSlide){
				fullslide=new fullSlide(elem,options);
			}
			if(typeof options=="string"){
				return fullslide[options]();
			}
		});
	}
	$.fn.fullSlide.defults={

	}
})(jQuery)