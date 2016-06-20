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
        this.inside=this.visualObj.width/1366;//������Ļ��С�����������
        var personWidth=this.getPersonWidth();
        var personHeight=this.getPersonHeight();
        this.personInsideLeft=(personWidth-personWidth*this.inside)/2;//�������ƫ�����
        this.personInsideTop=(personHeight-personHeight*this.inside)/2;//�����ϱ�ƫ�����
    }
    person.prototype={
        //��ȡ�߶�
        getPersonHeight:function(){
            return this.ele.height();
        },
        //��ȡλ��
        getPersonPosition:function(){
            return this.ele.position();
        },
        //��ȡ���
        getPersonWidth:function(){
            return this.ele.width();
        },
        //�����������
        setPersonScale:function(){
            this.ele.css({
                transform:'scale(' + this.inside + ')'
            });
        },
        //��ȡ���
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