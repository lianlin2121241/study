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
    function extend(subClass,superClass){
        var F=function(){};
        F.prototype=superClass.prototype;
        subClass.prototype=new F();
        subClass.prototype.constructor=subClass;
        subClass.superclass=superClass.prototype;
        if(superClass.prototype.constructor==Object.prototype.constructor){
            superClass.prototype.constructor=superClass;
        }
    }

    return {
        common:{
            extend:extend
        }
    }
})