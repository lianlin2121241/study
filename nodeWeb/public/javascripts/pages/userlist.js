$(function(){
    $(".table").on("click",".del",function(){
        var id=$(this).attr("data-id"),
            tr=$(this).closest("tr");
        $.ajax({
            type:"DELETE",
            url:"/admin/list?id="+id
        })
        .done(function(results){
            if(results.success==1){
                if(tr.length>0){
                    tr.remove();
                }
            }
        })
    })
})