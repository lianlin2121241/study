/**
 * Created by Administrator on 16-6-23.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(["dbCommon","common"], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function (dbCommon,common) {
    'use strict';
    function dbTomato(){
        dbCommon.dbCommon.call(this);
        this.dbStoreName="tomato";
        this.indexArr=[
            {
                name:"id",
                unique:true
            },
            {
                name:"name",
                unique:false
            },
            {
                name:"startTime",
                unique:false
            },
            {
                name:"endTime",
                unique:false
            }
        ];
    }

    common.common.extend(dbTomato, dbCommon.dbCommon);

    return {
        dbTomato:dbTomato
    }
})