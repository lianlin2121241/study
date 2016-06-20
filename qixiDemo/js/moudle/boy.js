/**
 * Created by Administrator on 16-6-14.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'transition', 'person',"common"], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($, transition, person,common) {
    'use strict';
    function boy(ele) {
        person.person.call(this, ele);
    }

    common.common.extend(boy, person.person);

    //计算移动距离
    boy.prototype._calculatedPosition = function (direction, percent) {
        return (direction == "x" ? this.visualObj.width : this.visualObj.height) * percent;
    }
    //男孩移动逻辑函数
    boy.prototype._walkRun = function (time, dist, disY) {
        var time = time || 3000;
        this.slowWalk();
        return this._transformFun({
            left: dist + "px",
            top: disY
        }, time)
    }
    //男孩移动执行函数
    boy.prototype._transformFun = function (obj, time) {
        var dfdPlay = $.Deferred();
        this.restoreWalk();
        this.ele.transition(obj, time, 'linear', function () {
            dfdPlay.resolve();
        })
        return dfdPlay;
    }
    //设置男孩位置
    boy.prototype.setBoyPosition = function (middleData, boyHeight) {
        this.ele.css({
            "top": middleData.top + middleData.height / 2  - boyHeight*this.inside-this.personInsideTop
        })
    }
    //男孩移动
    boy.prototype.walkTo = function (time, disX, disY) {
        var distX = this._calculatedPosition("x", disX);
        var distY = !!disY ? this._calculatedPosition("y", disY) : undefined;
        return this._walkRun(time, distX, distY);
    }
    //进入商店
    boy.prototype.toShop = function (time) {
        var dfdToShop = $.Deferred();
        var door = $(".door"),
            doorW = door.width(),
            doorLeft = door.offset().left,
            boy = $(".boy"),
            boyW = boy.width(),
            boyLeft = boy.offset().left;
        this.spacing = doorLeft + doorW / 2 - (boyLeft + boyW / 2);
        var dfdAnimate = this._transformFun({
            transform: "translateX(" + this.spacing + "px),scale(0.3,0.3)",
            opacity: 0.1
        }, time)
        dfdAnimate.done(function () {
            boy.css({
                opacity: 0
            })
            dfdToShop.resolve();
        })
        return dfdToShop;
    }
    //走出商店
    boy.prototype.outShop = function (time) {
        var dfdOutShop = $.Deferred();
        var dfdAnimate = this._transformFun({
            transform: "translateX(0px),scale("+this.inside+","+this.inside+")",
            opacity: 1
        }, time)
        dfdAnimate.done(function () {
            dfdOutShop.resolve();
        })
        return dfdOutShop;
    }
    //取花
    boy.prototype.getFlowers = function () {
        var dfdGetFlowers = $.Deferred();
        var self = this;
        setTimeout(function () {
            self.ele.addClass("has-flowers");
            dfdGetFlowers.resolve();
        }, 1000)
        return dfdGetFlowers;
    }
    //开始走动
    boy.prototype.restoreWalk = function () {
        this.ele.removeClass("pauseWalk");
    }
    //停止走动
    boy.prototype.slowWalk = function () {
        this.ele.addClass("pauseWalk");
    }
    //重置静止状态
    boy.prototype.resetOriginal = function () {
        this.slowWalk();
        this.ele.removeClass("boy-walk pauseWalk has-flowers").addClass("boyOriginal");
    }

    return {
        boy: boy
    }
})