/**
 * Created by Administrator on 16-6-20.
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
    function audioController(){
        this.musicList=["http://www.imooc.com/upload/media/circulation.wav","http://www.imooc.com/upload/media/happy.wav"];
        //this.musicList=["circulation.wav","happy.wav","camera.wav","music.mp3"]; //下载的文件可能有问题，不能进行循环播放
    }
    audioController.prototype={
        playAudio1:function(){
            var self=this;
            var audio = new Audio(this.musicList[1]);
            audio.autoPlay = true;
            audio.loop = false;
            audio.play();
            audio.addEventListener("ended",function(){
                self.playAudio2();
            },false)
        },
        playAudio2:function(){
            var audio1=new Audio(this.musicList[0]);
            audio1.autoPlay=true;
            audio1.loop=true;
            audio1.play();
        }
    }

    return {
        audio:audioController
    }
})