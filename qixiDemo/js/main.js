/**
 * Created by Administrator on 16-6-8.
 */
'use strict';
require.config({
    baseUrl:"./js/",
    paths:{
        jquery:"http://libs.baidu.com/jquery/1.9.1/jquery",
        transition:"libs/jquery.transition",
        common:"moudle/common/common",
        person:"moudle/person",
        boy:"moudle/boy",
        girl:"moudle/girl",
        scenario:"moudle/scenario",
        audio:"moudle/audio"
    }
})
require(["jquery","boy","girl","scenario","audio"],function($,boy,girl,scenario,audioreq){
    //实例化场景和男孩对象
    var funScenario=scenario.scenario;
    var funBoy=boy.boy;
    var funGirl=girl.girl;
    var audioreq=audioreq.audio;
    var Scenario=new funScenario($(".scenario-panel"));
    var Boy=new funBoy($(".boy"));
    var Girl=new funGirl($(".girl"));
    var AudioInstance=new audioreq();

    //定位男孩位置
    var middleData=Scenario.getMiddleData();
    Boy.setPersonScale();
    var boyHeight=Boy.getPersonHeight();
    Boy.setBoyPosition(middleData,boyHeight);

    //定位女孩位置
    Girl.setPersonScale();
    var girlHeight=Girl.getPersonHeight();
    Girl.setGirlPosition(middleData,girlHeight);

    //场景一动画加载
    $(".sun").addClass("sunAnimate");
    $(".cloud1").addClass("cloud1Animate");
    $(".cloud2").addClass("cloud2Animate");

    //播放背景音乐
    AudioInstance.playAudio1();

    //动画主流程
    Boy.walkTo(2000,0.2)
        .then(function(){
            var toleft=Scenario.getToLeft(1);
            Scenario.moveLeft(5000,-toleft);
        })
        .then(function(){
            return Boy.walkTo(5000,0.5);
        })
        .then(function(){
            Boy.slowWalk();
            return Scenario.openDoor();
        })
        .then(function(){
            Scenario.brightLight();
            return Boy.toShop(2000);
        })
        .then(function(){
            return Boy.getFlowers();
        })
        .then(function(){
            return Boy.outShop(2000);
        })
        .then(function(){
            Scenario.birdFly();
        })
        .then(function(){
            var toleft=Scenario.getToLeft(2);
            Scenario.moveLeft(5000,-toleft);
            return Scenario.closeDoor();
        })
        .then(function(){
            Scenario.darkLight();
        })
        .then(function(){
            return Boy.walkTo(3000,0.16);
        })
        .then(function(){
            var girlHeight=Girl.getPersonHeight();
            var boyTop=(middleData.top-girlHeight*Girl.inside-Girl.personInsideTop)/Girl.visualObj.height;
            return Boy.walkTo(1500,0.25,boyTop);
        })
        .then(function(){
            var boyWidth=Boy.getPersonWidth();
            var boyLeft=(Girl.getPersonPosition().left-boyWidth*Boy.inside-Boy.personInsideLeft+Girl.getPersonWidth()*Girl.inside/5)/Boy.visualObj.width;
            return Boy.walkTo(1500,boyLeft);
        })
        .then(function(){
            Boy.resetOriginal();
        })
        .then(function(){
            setTimeout(function(){
                Girl.rotate();
                Boy.rotate(function(){
                    Scenario.logoAnimate();
                    Scenario.snowflake();
                    console.log("rotate end");
                });
            },1000)
        })
})
