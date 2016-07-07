$(function(){
    $(".media-list").on("click","a",function(){
        var tid=$(this).attr("data-tid"),
        	cid=$(this).attr("data-cid");

        if($("hidCommentId").length>0){
        	$("hidCommentId").val(cid)
        }else{
        	$("<input id='hidCommentId' type='hidden' name='cid' value='"+cid+"'/>").appendTo("#commentForm");
        }

        if($("hidToId").length>0){
        	$("hidToId").val(tid);
        }else{
        	$("<input id='hidToId' type='hidden' name='tid' value='"+tid+"'/>").appendTo("#commentForm");
        }
    })
})