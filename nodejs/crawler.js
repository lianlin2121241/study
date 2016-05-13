var http=require("http");
var cheerio=require("cheerio");
var url="http://www.imooc.com/learn/348";

function printCourseInfo(data){
	data.forEach(function(item){
		console.log(item.chapterTitle+"\n");
		item.videos.forEach(function(item){
			console.log("  【"+item.id+"】  "+item.videoTitle+"\n");
		})
	})
}

function filterChapters(data){
	var $=cheerio.load(data);
	var chapters=$(".chapter");
	var courseData=[];
	chapters.each(function(item){
		var chapter=$(this);
		var chapterTitle=chapter.find("strong").text();
		var chapterObj={
			chapterTitle:chapterTitle,
			videos:[]
		}
		var chapterVideos=chapter.find(".video li");
		chapterVideos.each(function(item){
			var video=$(this);
			var videoTitle=video.find("a").text();
			var videoHref=video.find("a").attr("href");
			var videoId=videoHref.split("/video/")[1];
			var videoObj={
				videoTitle:videoTitle,
				id:videoId
			}
			chapterObj.videos.push(videoObj);
		})
		courseData.push(chapterObj);
	})
	return courseData;
}

http.get(url,function(res){
	var html="";
	res.on("data",function(data){
		html+=data;
	})
	res.on("end",function(){
		var filterChaptersInfo=filterChapters(html);
		// console.log(filterChaptersInfo);
		printCourseInfo(filterChaptersInfo);
	})
}).on("error",function(){
	console.log("数据错误");
})