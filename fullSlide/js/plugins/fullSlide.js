(function($){
	var fullSlide=(function(){
		function fullSlide(elem,options){
			this.elem=elem;
			this.settings=$.extend(true, $.fn.fullSlide.defults,options||{});
			this.init();
		}
		fullSlide.prototype={
			init:function(){
				var self=this;
				self.sections=self.elem;
				self.section=self.elem.find(self.settings.sectionOpt.section);
				self.count=self.section.length;
				self.index=self.settings.index<self.count?self.settings.index:0;
				self.pw=self.elem.width();
				self.ph=self.elem.height();
				self.canAnimate=true;
				self.show();
				self.event();
			},
			prev:function(){
				var self=this;
				if (self.index==0) {
					return;
				};
				self.index--;
				self.canAnimate=false;
			},
			next:function(){
				var self=this;
				if (self.index==self.count-1) {
					return;
				};
				self.index++;
				self.canAnimate=false;
			},
			translate:function(){
				var self=this;
				if(self.direction){
					self.next();
				}else{
					self.prev();
				}
				self.sections.css({
					"transform":self.settings.direction=="h"?"translateX("+-self.pw*self.index+"px)":"translateY("+-self.ph*self.index+"px)",
					"transition":"all "+self.settings.duration+"ms "+self.settings.timing
				});
			},
			show:function(){
				var self=this;
				if(self.settings.pagination){
					var paginationPanel=$("<ul></ul>");
					for(i=0;i<self.count;i++){
						paginationPanel.append('<li></li>');
					}
					paginationPanel.addClass(self.settings.sectionOpt.paginationClass).appendTo(self.elem);
					paginationPanel.find('li:eq('+self.index+')').addClass(self.settings.sectionOpt.paginationActive);
				}
				if(self.settings.direction=="h"){
					self.sections.width(self.count*100+"%");
					self.section.width(100/self.count+"%");
					paginationPanel.addClass('pagination-h');
					paginationPanel.css("marginLeft",-paginationPanel.width()/2+"px");
				}else{
					self.sections.height(self.count*100+"%");
					self.section.height(100/self.count+"%");
					paginationPanel.addClass('pagination-v');
					paginationPanel.css("marginTop",-paginationPanel.height()/2+"px");
				}
				self.sections.css({
					"transform":self.settings.direction=="h"?"translateX("+-self.pw*self.index+"px)":"translateY("+-self.ph*self.index+"px)"
				});
			},
			setDirection:function(e){
				var self=this;
				var wheelval=0;
				if(e.originalEvent.wheelDelta){//IE/Opera/Chrome
    				wheelval=e.originalEvent.wheelDelta;
        		}else if(e.originalEvent.detail){//Firefox
     				wheelval=0-e.originalEvent.detail;
 				}
 				if(wheelval>0){
 					self.direction=false;
 				}else{
 					self.direction=true;
 				}
			},
			event:function(){
				var self=this;
				self.elem.on("DOMMouseScroll mousewheel",function(e){
					if (!self.canAnimate) {return;};
					self.setDirection(e);
					self.translate();
				})
				self.elem.on("webkitTransitionEnd otransitionend transitionend",function(e){
					self.canAnimate=true;
				})
			}
		}
		return fullSlide;
	})()
	$.fn.fullSlide=function(options){
		return $(this).each(function(index, el) {
			var fullslide=$(this).data("data-fullslide"),
				elem=$(this);
			if(!fullslide){
				fullslide=new fullSlide(elem,options);
			}
			if(typeof options=="string"){
				return fullslide[options]();
			}
		});
	}
	$.fn.fullSlide.defults={
		sectionOpt:{
			sections:".sections",
			section:".section",
			paginationClass:"pagination",
			paginationActive:"active"
		},
		pagination:false,
		duration:500,
		timing:"ease",
		index:2,
		direction:"v",
		callback:$.noop()
	}
})(jQuery)