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
    $.common={
        formToObject: function($form, flag) {
            var arr = [],
                o = {};
            $form.each(function() {
                // input 等
                $(this).find("input[name][data-toObject!=false]").add("select[name],textarea[name]").each(function() {
                    var $this = $(this),
                        value = $this.val();
                    if ($this.attr("type") == "radio" && !$this.prop("checked")) {
                        return true;
                    } else if ($this.attr("type") == "checkbox") {

                    } else {
                        $this.attr("data-formValue") && (value = $this.attr("data-formValue"));
                    }
                    o[$this.attr("name")] = $.trim(value);
                });
                flag && arr.push(o);
            });
            return flag ? arr : o;
        },
    }
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
    Date.prototype.Format = function(formatStr) {
        var str = formatStr;
        var Week = ['日','一','二','三','四','五','六'];
        str=str.replace(/yyyy|YYYY/,this.getFullYear());
        str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
        str=str.replace(/MM/,(parseInt(this.getMonth())+1)>9?(parseInt(this.getMonth())+1).toString():'0' + (parseInt(this.getMonth())+1));
        str=str.replace(/M/g,parseInt(this.getMonth())+1);
        str=str.replace(/w|W/g,Week[this.getDay()]);
        str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
        str=str.replace(/d|D/g,this.getDate());
        str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
        str=str.replace(/h|H/g,this.getHours());
        str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
        str=str.replace(/m/g,this.getMinutes());
        str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
        str=str.replace(/s|S/g,this.getSeconds());
        return str;
    }

    return {
        common:{
            extend:extend
        }
    }
})