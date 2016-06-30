/**
 * Created by Administrator on 16-6-8.
 */
'use strict';
require.config({
    baseUrl:"./js/",
    paths:{
        jquery:"http://libs.baidu.com/jquery/1.9.1/jquery",
        jqueryui:"http://cdn.bootcss.com/jqueryui/1.12.0-rc.2/jquery-ui.min",
        underscore:"plugins/underscore/underscore",
        common:"moudle/common/common",
        dbCommon:"moudle/dbCommon",
        dbPotato:"moudle/dbPotato",
        dbTomato:"moudle/dbTomato",
        potato:"moudle/potato",
        tomato:"moudle/tomato"
    }
})
require(["jquery","potato","tomato","dbPotato","dbTomato","dbCommon"],function($,potato,tomato,dbPotato,dbTomato,dbCommon){
    $(function(){
        var DBPotato=new dbPotato.dbPotato();
        var DBTomato=new dbTomato.dbTomato();
        var DBCommon=new dbCommon.dbCommon();
        var dbObj=[
            {
                dbStoreName:DBPotato.dbStoreName,
                indexArr:DBPotato.indexArr
            },
            {
                dbStoreName:DBTomato.dbStoreName,
                indexArr:DBTomato.indexArr
            }
        ]
        DBCommon.openDB(function(){
            //console.log("数据库版本未变更。")
        },dbObj);

        potato.init();
        tomato.init();
    })
})
