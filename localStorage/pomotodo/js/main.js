/**
 * Created by Administrator on 16-6-8.
 */
'use strict';
require.config({
    baseUrl:"./js/",
    paths:{
        jquery:"http://libs.baidu.com/jquery/1.9.1/jquery",
        underscore:"plugins/underscore/underscore",
        common:"moudle/common/common",
        dbCommon:"moudle/dbCommon",
        dbPotato:"moudle/dbPotato",
        dbTomato:"moudle/dbTomato",
        potato:"moudle/potato",
        tomato:"moudle/tomato"
    }
})
require(["jquery","potato","tomato"],function($,potato,tomato){
    $(function(){
        tomato.init();
        potato.init();
    })
})
