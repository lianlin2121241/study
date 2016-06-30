/**
 * Created by Administrator on 16-6-23.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(["jquery","dbTomato","underscore","common"], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($,dbTomato,_) {
    'use strict';
    function init(){
        dbTomato=new dbTomato.dbTomato();
        var musicPath="./media/warming.mp3";
        var music=null;
        var $tomatoName=$("#tomatoName");
        var $txbStartTime=$("#txbStartTime");
        var $txbEndTime=$("#txbEndTime");
        var $txbTomatoId=$("#txbTomatoId");
        var $listPanel=$("#listGroup");
        var $tomatoListGroupTemp=$("#tomatoListGroupTemp");
        var $tomatoListItemTemp=$("#tomatoListItemTemp");
        var $formTomato=$("#formTomato");
        var $customProgress=$("#customProgress");
        var $customProgressChild=$("#customProgressChild");
        var $customProgressNum=$("#customProgressNum");
        var $startTomato=$("#startTomato");
        var $panelHeadingTomato=$("#panelHeadingTomato");
        var $delTomato=$("#delTomato");
        var $clearTomato=$("#clearTomato");

        var times=25*60;//25*60
        var restTimes=5*60;//5*60
        var timeCount=0;
        var interval=null;
        function starInterval(callback){
            interval=setInterval(function(){
                timeCount++;
                callback.call();
            },1000);
        }
        function stopInterval(){
            !!interval&&clearInterval(interval);
            timeCount=0;
        }

        function playMusic(){
            if(!music){
                music=new Audio(musicPath);
                //music.loop = 1;
            }
            music.play();
        }

        function stopMusic(){
            audio.currentTime = 0;
            music.paused();
        }

        //格式化数据为分组数据
        function formatData(data){
            var newDataObj={};
            data.forEach(function(item,index){
                if(!item.startTime){
                    return
                }
                var date=item.startTime.split(" ")[0];
                if(!newDataObj[date]){
                    newDataObj[date]=[]
                }
                newDataObj[date].push(item);
            })
            return newDataObj;
        }
        //渲染番茄列表
        var showData=function(data){
            $listPanel.empty();
            if(!!data){
                for(var key in data){
                    var temp=$tomatoListGroupTemp.html();
                    temp=temp.replace(/{groupName}/g,key+"&nbsp;&nbsp;&nbsp;完成了"+data[key].length+"个土豆");
                    $listPanel.append(temp);

                    data[key].forEach(function(item,index){
                        var tempChild=$tomatoListItemTemp.html();
                        var startTime=item.startTime.split(" ")[1].substring(0,5);
                        var endTime=item.endTime.split(" ")[1].substring(0,5);
                        tempChild=tempChild.replace(/{name}/g,"("+startTime+"-"+endTime+")&nbsp;&nbsp;&nbsp;"+item.name);
                        $listPanel.append(tempChild);
                    })
                }
            }
        }
        //加载土豆列表
        var loadData=function(){
            dbTomato.searchAll({
                getType:"index",
                indexName:"startTimeIndex",
                cb:function(data){
                    showData(formatData(data.reverse()));
                }
            })
        }
        loadData();

        function showTomatoHeadState(type){
            $formTomato.add($delTomato).add($customProgress).add($startTomato).addClass("hide");
            switch (type){
                case "start":
                    $startTomato.removeClass("hide");
                    break;
                case "end":
                    $formTomato.add($delTomato).removeClass("hide");
                    break;
                case "ing":
                    $customProgress.add($delTomato).removeClass("hide");
                    break;
            }
        }

        //休息时间
        function restTime(){
            showTomatoHeadState("ing");
            $customProgress.data("progressType","rest");
            $customProgressChild.width("0px");
            $customProgressNum.text("5:00");
            starInterval(function(){
                if(timeCount==restTimes){
                    $("title").html("番茄土豆");
                    stopInterval();
                    showTomatoHeadState("start");
                    playMusic();
                    return;
                }
                $customProgressChild.width((timeCount/restTimes*100)+"%");

                var timeShowMM=Math.floor((restTimes-timeCount)/60);
                timeShowMM=timeShowMM==0?"00":timeShowMM<10?"0"+timeShowMM:timeShowMM;
                var timeShowSS=Math.floor((restTimes-timeCount)%60);
                timeShowSS=timeShowSS==0?"00":timeShowSS<10?"0"+timeShowSS:timeShowSS;
                $customProgressNum.text(timeShowMM+":"+timeShowSS);
                $("title").html("休息中："+timeShowMM+":"+timeShowSS)
            })
        }

        $panelHeadingTomato
            .on("click","#startTomato",function(e){
                showTomatoHeadState("ing");
                $customProgress.data("progressType","ing");
                $customProgressChild.width("0px");
                $customProgressNum.text("25:00");
                $tomatoName.val("");
                $txbStartTime.val("");
                $txbEndTime.val("");
                var startTime=new Date().Format("yyyy-MM-dd hh:mm:ss")
                $txbStartTime.val(startTime);
                starInterval(function(){
                    if(timeCount==times){
                        $("title").html("番茄土豆");
                        stopInterval();
                        showTomatoHeadState("end");
                        var potatoVal=$("#potatoPanel").find(".list-group-item:first .potatoName").text();
                        $tomatoName.val(potatoVal).focus();
                        var endTime=new Date().Format("yyyy-MM-dd hh:mm:ss")
                        $txbEndTime.val(endTime);
                        playMusic();
                        return;
                    }
                    $customProgressChild.width((timeCount/times*100)+"%");

                    var timeShowMM=Math.floor((times-timeCount)/60);
                    timeShowMM=timeShowMM==0?"00":timeShowMM<10?"0"+timeShowMM:timeShowMM;
                    var timeShowSS=Math.floor((times-timeCount)%60);
                    timeShowSS=timeShowSS==0?"00":timeShowSS<10?"0"+timeShowSS:timeShowSS;
                    $customProgressNum.text(timeShowMM+":"+timeShowSS);
                    $("title").html("工作中："+timeShowMM+":"+timeShowSS)
                })
            })
            .on("click","#delTomato",function(){
                if($tomatoName.is(":visible")){
                    if(confirm("确认是否放弃保存番茄？")){
                        showTomatoHeadState("start")
                    }
                }else if($customProgress.is(":visible")){
                    if($customProgress.data("progressType")=="ing"&&confirm("番茄正在进行，确认是否放弃番茄？")){
                        $("title").html("番茄土豆")
                        showTomatoHeadState("start")
                        stopInterval();
                    }else if($customProgress.data("progressType")=="rest"){
                        $("title").html("番茄土豆");
                        showTomatoHeadState("start")
                        stopInterval();
                    }
                }
            })
            .on("keydown","#tomatoName",function(e){
                var self=this;
                var keyCode=e.keyCode;
                if(keyCode==13){
                    var data = $.common.formToObject($formTomato);
                    dbTomato.save(data,function(){
                        loadData();
                        showTomatoHeadState("start");
                        restTime();
                        console.log("保存番茄成功！");
                    })
                    return false;
                }
            })


        $clearTomato.on("click",function(){
            if(confirm("清除数据会导致所有番茄删除，是否确认清除？")) {
                dbTomato.clearStore(function () {
                    loadData();
                    console.log("清除成功！");
                })
            }
        })
    }
    function destory(){

    }

    return {
        init:init,
        destory:destory
    }
})