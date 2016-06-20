/**
 * Created by Administrator on 16-6-16.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'person',"common"], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($,person,common) {
    'use strict';
    function girl(ele){
        person.person.call(this,ele);
    }

    common.common.extend(girl,person.person);

    //…Ë÷√≈Æ∫¢Œª÷√
    girl.prototype.setGirlPosition=function(middleData, girlHeight){
        this.ele.css({
            left:this.visualObj.width/2-this.personInsideLeft,
            top:middleData.top-girlHeight*this.inside-this.personInsideTop
        })
    }

    return {
        girl:girl
    }
})