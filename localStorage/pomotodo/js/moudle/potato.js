/**
 * Created by Administrator on 16-6-23.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(["jquery","dbPotato","underscore","common","jqueryui"], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function ($,dbPotato,_) {
    'use strict';
    function init(){
        dbPotato=new dbPotato.dbPotato();
        var $potatoName=$("#potatoName");
        var $listPanel=$("#potatoPanel");
        var $potatoListItemTemp=$("#potatoListItemTemp");
        var $clearPotato=$("#clearPotato");

        function updateSort(event, ui){
            var listGroupItems=$listPanel.children();
            listGroupItems.each(function(index,item){
                var id=parseInt($(item).attr("data-id"));
                dbPotato.searchById(id,function(result){
                    result["sort"]=index;
                    dbPotato.save(result,function(){
                        console.log("修改顺序成功！");
                    })
                })
            })
        }
        $listPanel.sortable({
            placeholder: "sortable-placeholder",
            stop:updateSort
        })
        $listPanel.disableSelection()

        //渲染土豆列表
        var showData=function(data){
            $listPanel.empty();
            if(data.length>0){
                data.forEach(function(item,index){
                    var temp=$potatoListItemTemp.html();
                    temp=temp.replace(/{id}/g,item.id);
                    temp=temp.replace(/{name}/g,item.name);
                    $listPanel.append(temp);
                })
            }
        }
        //加载土豆列表
        var loadData=function(){
            dbPotato.searchAll({
                getType:"index",
                indexName:"sortIndex",
                cb:function(data){
                    data=_.filter(data, function(item){ return item.isDel == 0; })
                    showData(data);
                }
            })
        }
        loadData();
        $potatoName.on("keydown",function(e){
            var keyCode=e.keyCode;
            if(keyCode==13){
                var potatoName=$.trim($potatoName.val());
                var dateTime=new Date().Format("yyyy-MM-dd hh:mm:ss");
                if(potatoName.length==0){
                    return;
                }
                var potatoCount=$listPanel.children().length;
                var data={
                    name:potatoName,
                    createTime:dateTime,
                    isDel:0,
                    sort:potatoCount
                }
                dbPotato.save(data,function(){
                    loadData();
                    $potatoName.val("");
                    console.log("添加成功！");
                })
                return false;
            }
        })

        $listPanel
            .on("dblclick",".list-group-item",function(){
                $(this).find(".form-inline").hide();
                $(this).find(".form-control").removeClass("hide");
                $(this).find(".badge").addClass("hide");
                $listPanel.sortable( "disable" );
            })
            .on("keydown",".form-control",function(e){
                var self=this;
                var listGroupItem=$(self).closest(".list-group-item");
                var keyCode=e.keyCode;
                if(keyCode==13) {
                    var data = $.common.formToObject($(this).closest("form"));
                    data.id=parseInt(data.id);
                    var dateTime=new Date().Format("yyyy-MM-dd hh:mm:ss");
                    data.createTime=dateTime;
                    dbPotato.searchById(data.id,function(result){
                        data=$.extend(result,data);
                        dbPotato.save(data,function(){
                            listGroupItem.find(".form-inline").show().find(".potatoName").text(data.name);
                            listGroupItem.find(".form-control").addClass("hide");
                            if(listGroupItem.find(":checkbox").is(":checked")){
                                listGroupItem.find(".badge").removeClass("hide");
                            }else{
                                listGroupItem.find(".badge").addClass("hide");
                            }
                            $listPanel.sortable( "enable" );
                            console.log("修改成功！");
                        })
                    })
                    return false;
                }
            })
            .on("click","input[type=checkbox]",function(){
                var self=this;
                var listGroupItem=$(self).closest(".list-group-item");
                if($(self).prop("checked")){
                    listGroupItem.find(".badge").removeClass("hide");
                }else{
                    listGroupItem.find(".badge").addClass("hide");
                }
            })
            .on("click",".badge",function(){
                var self=this;
                var ids=[];
                $listPanel.find(":checked").each(function(){
                    ids.push(parseInt($(this).attr("id")));
                })
                if(ids.length>0){
                    dbPotato.deleteArr(ids,function(){
                        loadData();
                        console.log("删除成功！");
                    });
                }
            })

        $clearPotato.on("click",function(){
            dbPotato.clearStore(function(){
                loadData();
                console.log("清除成功！");
            })
        })
    }
    function destory(){

    }

    return {
        init:init,
        destory:destory
    }
})