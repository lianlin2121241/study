$(function(){
    $("#douban").on("blur",function(){
    	var id=$("#douban").val();
    	var urlTemp="https://api.douban.com/v2/movie/subject/"+id;
    	$.ajax({
    		url:urlTemp,
    		dataType:"jsonp",
    		crossDomain:true,
    		jsonp:"callback",
    		cache:true,
    		success:function(data){
    			$("#inputTitle").val(data.title);
				$("#inputDoctor").val(data.directors[0].name);
				$("#inputCountry").val(data.countries[0]);
				$("#inputPoster").val(data.images.large);
				$("#inputYear").val(data.year);
				$("#inputSummary").val(data.summary);
    		}
    	})
    })
})