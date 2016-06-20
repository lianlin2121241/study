/**
 * Created by Administrator on 16-6-16.
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function($) {
    'use strict';
    function person(ele){
        this.ele=ele;
        this.visualObj={
            width:$(window).width(),
            height:$(window).height()
        };
        this.inside=this.visualObj.width/1366;//根据屏幕大小计算任务比例
        var personWidth=this.getPersonWidth();
        var personHeight=this.getPersonHeight();
        this.personInsideLeft=(personWidth-personWidth*this.inside)/2;//人物左边偏差距离
        this.personInsideTop=(personHeight-personHeight*this.inside)/2;//人物上边偏差距离
    }
    person.prototype={
        //获取高度
        getPersonHeight:function(){
            return this.ele.height();
        },
        //获取位置
        getPersonPosition:function(){
            return this.ele.position();
        },
        //获取宽度
        getPersonWidth:function(){
            return this.ele.width();
        },
        //设置人物比例
        setPersonScale:function(){
            this.ele.css({
                transform:'scale(' + this.inside + ')'
            });
        },
        //获取宽度
        rotate:function(callback){
            this.ele.addClass("rotate");
            if(!!callback) {
                var self=this.ele;
                self.on("webkitAnimationEnd animationend", function () {
                    callback.call();
                    self.off();
                })
            }
        }
    }

    return {
        person:person
    }
})