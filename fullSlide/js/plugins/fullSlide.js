(function($){
	var supports = (function() { 
		var div = document.createElement('div'), 
		vendors = 'Khtml O Moz Webkit'.split(' '), 
		len = vendors.length; 
		return function(prop) { 
			if ( prop in div.style ) return true; 
			if ('-ms-' + prop in div.style) return true; 
			prop = prop.replace(/^[a-z]/, function(val) { 
				return val.toUpperCase(); 
			}); 
			while(len--) { 
				if ( vendors[len] + prop in div.style ) { 
					return true; 
				} 
			} 
			return false; 
		}; 
	})(); 
	var fullSlide=(function(){
		function fullSlide(elem,options){
			this.elem=elem;
			this.settings=$.extend(true, $.fn.fullSlide.defults,options||{});
			this.init();
		}
		fullSlide.prototype={
			init:function(){
				var self=this;
				self.sections=self.elem.find(self.settings.sectionOpt.sections);
				self.section=self.elem.find(self.settings.sectionOpt.section);
				self.count=self.section.length;
				self.index=self.settings.index<self.count?self.settings.index:0;
				self.canCss3=supports("transform3");
				self.pw=self.elem.width();
				self.ph=self.elem.height();
				self.canAnimate=true;
				self.show();
				self.event();
			},
			prev:function(){
				var self=this;
				if (self.index==0&&!self.settings.loop) {
					return;
				}else if(self.index==0&&self.settings.loop){
					self.index=self.count-1;
				}else{
					self.index--;
				}
				self.canAnimate=false;
			},
			next:function(){
				var self=this;
				if (self.index==self.count-1&&!self.settings.loop) {
					return;
				}else if (self.index==self.count-1&&self.settings.loop) {
					self.index=0;
				}else{
					self.index++;
				}
				self.canAnimate=false;
			},
			translate:function(){
				var self=this;
				if(self.direction){
					self.next();
				}else{
					self.prev();
				}
				self.fullAnimate();
			},
			fullAnimate:function(){
				var self=this;
				if(self.canCss3){
					self.sections.css({
						"transform":self.settings.direction=="h"?"translateX("+-self.pw*self.index+"px)":"translateY("+-self.ph*self.index+"px)",
						"transition":"all "+self.settings.duration+"ms "+self.settings.timing
					});
				}else{
					var cssObj=self.settings.direction=="h"?{"marginLeft":-self.pw*self.index+"px"}:{"marginTop":-self.ph*self.index+"px"};
					self.sections.animate(cssObj,self.settings.duration,function(){
						self.canAnimate=true;
						!!self.settings.callback&&self.settings.callback.call();
					})
				}
				if(self.settings.pagination){
					self.paginationPanel.find('li:eq('+self.index+')').addClass(self.settings.sectionOpt.paginationActive).siblings().removeClass(self.settings.sectionOpt.paginationActive);
				}
			},
			show:function(){
				var self=this;
				if(self.settings.pagination){
					var paginationPanel=$("<ul></ul>");
					for(i=0;i<self.count;i++){
						paginationPanel.append('<li></li>');
					}
					self.paginationPanel=paginationPanel;
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
				if(self.canCss3){
					self.sections.css({
						"transform":self.settings.direction=="h"?"translateX("+-self.pw*self.index+"px)":"translateY("+-self.ph*self.index+"px)"
					});
				}else{
					var cssObj=self.settings.direction=="h"?{"marginLeft":-self.pw*self.index+"px"}:{"marginTop":-self.ph*self.index+"px"};
					self.sections.css(cssObj);
				}
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
					!!self.settings.callback&&self.settings.callback.call();
				})
				self.paginationPanel.on("click","li",function(){
					self.index=$(this).index();
					self.fullAnimate();
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
		loop:false,
		duration:500,
		timing:"ease",
		index:2,
		direction:"h",
		callback:$.noop()
	}
})(jQuery)