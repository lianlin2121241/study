/**
 * Created by Administrator on 16-6-7.
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
    function Scenario(ele){
        this.ele=ele;
        this.middlePanel=ele.find(".scenario:first .middle");
        this.visuals=ele.children();
        this.moveTo=0;
    }
    Scenario.prototype={
        //获取中间道路对象
        getMiddleData:function(){
            return {
                top:this.middlePanel.position().top,
                height:this.middlePanel.height()
            }
        },
        //背景移动函数
        moveLeft:function(time,moveTo){
            this.ele.css({
                "transform":"translate3d("+(moveTo)+"px,0,0)",
                "transition":"all "+time+"ms linear"
            })
            this.moveTo=moveTo;
        },
        //获取向左移动位置
        getToLeft:function(index){
            var screenWidth=this.getScenarioWidth();
            return screenWidth*index;
        },
        //获取单个场景宽度
        getScenarioWidth:function(){
            return $(".scenario").width();
        },
        //获取单个场景高度
        getScenarioHeight:function(){
            return $(".scenario").height();
        },
        //开关门函数
        _doorAction:function(left,right,time){
            var dfdDoor=$.Deferred();
            var count=2;
            var leftDoor=$(".door-left"),
                rightDoor=$(".door-right");
            var tempFun=function(){
                if(count==1){
                    dfdDoor.resolve();
                }
                count--;
            }
            leftDoor.transition({
                left:left
            },time,tempFun)
            rightDoor.transition({
                left:right
            },time,tempFun)
            return dfdDoor;
        },
        //开门
        openDoor:function(){
            return this._doorAction("-50%","100%",2000);
        },
        //关门
        closeDoor:function(){
            return this._doorAction("0%","50%",2000);
        },
        //开灯
        brightLight:function(){
            var scenario2=$(".scenario2");
            scenario2.addClass("bright");
        },
        //关灯
        darkLight:function(){
            var scenario2=$(".scenario2");
            scenario2.removeClass("bright");
        },
        //飞鸟
        birdFly:function(){
            var $bird=$(".bird");
            $bird.addClass("birdFly");
            var scenarioWidht=this.getScenarioWidth();
            $bird.transition({
                right:scenarioWidht
            },15000,"linear")
        },
        //logo
        logoAnimate:function(){
            var $logo=$(".logo");
            $logo.addClass("logo-in");
            $logo.on("webkitAnimationEnd animationend",function(){
                $logo.addClass("logo-shake");
            })
        },
        //下花瓣
        snowflake:function(){
            var arrSnowSource=[
                "images/snowflake/snowflake1.png",
                "images/snowflake/snowflake2.png",
                "images/snowflake/snowflake3.png",
                "images/snowflake/snowflake4.png",
                "images/snowflake/snowflake5.png",
                "images/snowflake/snowflake6.png"
            ]
            function getSnowUrl(){
                return arrSnowSource[Math.floor(Math.random()*6)];
            }
            var scenarioWidth=this.getScenarioWidth(),
                scenarioHeight=this.getScenarioHeight();
            var snowPanel=$(".snow-panel");
            function createSnowFlake(){
                var url=getSnowUrl();
                var html=$("<div class='snowbox'></div>");
                html.css({
                    "backgroundImage":"url("+url+")"
                })
                return html;
            }
            setInterval(function(){
                var snow=createSnowFlake();
                snow.appendTo(snowPanel).addClass("snow-rotate");
                var startOpacity= 1,
                    startLeft=Math.random()*scenarioWidth-100,
                    endLeft=startLeft-100+500*Math.random(),
                    endTop=scenarioHeight-40,
                    duration=scenarioHeight*10+Math.random()*5000;
                var randomStart=Math.random();
                startOpacity=randomStart<0.5?1:randomStart;

                snow.css({
                    left:startLeft+"px",
                    opacity:startOpacity
                })
                snow.transition({
                    opacity:0.7,
                    left:endLeft+"px",
                    top:endTop+"px"
                },duration,"ease-out",function(){
                    snow.remove();
                })
            },200)
        }
    }

    return {
        scenario:Scenario
    }
})