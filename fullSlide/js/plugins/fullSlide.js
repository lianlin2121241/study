(function($){
	//判断是否支持css3属性
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
			//初始化方法
			init:function(){
				var self=this;
				self.sections=self.elem.find(self.settings.sectionOpt.sections);
				self.section=self.elem.find(self.settings.sectionOpt.section);
				self.count=self.section.length;
				self.index=self.settings.index>=0&&self.settings.index<self.count?self.settings.index:0;
				self.canCss3=supports("transform");
				self.canAnimate=true;
				self.show();
				if(self.settings.pagination){
					self.showPagination();
				}
				self.event();
			},
			//向前滑动
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
			//向后滑动
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
			//设置滑动方向
			setDirection:function(e){
				var self=this;
				var wheelval=e.originalEvent.wheelDelta||-e.originalEvent.detail;
 				if(wheelval>0){
 					self.direction=false;
 				}else{
 					self.direction=true;
 				}
			},
			//判断方向触发滑动
			translate:function(){
				var self=this;
				if(self.direction){
					self.next();
				}else{
					self.prev();
				}
				self.fullAnimate();
			},
			//滚动方法
			fullAnimate:function(){
				var self=this;
				if(self.canCss3){
					var boxPosition=self.section.eq(self.index).position();
					self.sections.css({
						"transform":self.settings.direction=="h"?"translateX("+-boxPosition.left+"px)":"translateY("+-boxPosition.top+"px)",
						"transition":"all "+self.settings.duration+"ms "+self.settings.timing
					});
				}else{
					var cssObj=self.settings.direction=="h"?{"marginLeft":-self.pw*self.index+"px"}:{"marginTop":-self.ph*self.index+"px"};
					self.sections.animate(cssObj,self.settings.duration,function(){
						self.canAnimate=true;
						!!self.settings.callback&&self.settings.callback.call(self);
					})
				}
				if(self.settings.pagination){
					self.paginationPanel.find('li:eq('+self.index+')').addClass(self.settings.sectionOpt.paginationActive).siblings().removeClass(self.settings.sectionOpt.paginationActive);
				}
			},
			//展示渲染函数
			show:function(){
				var self=this;
				self.pw=self.elem.width();
				self.ph=self.elem.height();
				if(self.settings.direction=="h"){
					self.sections.width(self.count*100+"%");
					self.section.width((100/self.count).toFixed(2)+"%");
				}else{
					self.sections.height(self.count*100+"%");
					self.section.height((100/self.count).toFixed(2)+"%");
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
			//展示渲染分页
			showPagination:function(){
				var self=this;
				var paginationPanel=$("<ul></ul>");
				for(i=0;i<self.count;i++){
					paginationPanel.append('<li></li>');
				}
				self.paginationPanel=paginationPanel;
				paginationPanel.addClass(self.settings.sectionOpt.paginationClass).appendTo(self.elem);
				paginationPanel.find('li:eq('+self.index+')').addClass(self.settings.sectionOpt.paginationActive);
				if(self.settings.direction=="h"){
					paginationPanel.addClass('pagination-h');
					paginationPanel.css("marginLeft",-paginationPanel.width()/2+"px");
				}else{
					paginationPanel.addClass('pagination-v');
					paginationPanel.css("marginTop",-paginationPanel.height()/2+"px");
				}
			},
			//添加事件
			event:function(){
				var self=this;
				self.elem.on("DOMMouseScroll mousewheel",function(e){
					if (!self.canAnimate) {return;};
					self.setDirection(e);
					self.translate();
				})
				self.elem.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend",function(e){
					self.canAnimate=true;
					!!self.settings.callback&&self.settings.callback.call(self);
				})
				if(self.settings.pagination){
					self.paginationPanel.on("click","li",function(){
						self.index=$(this).index();
						self.fullAnimate();
					})
				}
				if(self.settings.keybord){
					$(document).on("keyup",function(e){
						if (!self.canAnimate) {return;};
						if(e.keyCode==37||e.keyCode==38){
	 						self.direction=false;
							self.translate();
						}else if(e.keyCode==39||e.keyCode==40){
	 						self.direction=true;
							self.translate();
						}
					})
				}
				$(window).resize(function(){
					self.show.call(self);
				});;
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
		keybord:true,
		loop:false,
		duration:500,
		timing:"ease",
		index:0,
		direction:"h",
		callback:$.noop()
	}
})(jQuery)