var http=require("http");
var cheerio=require("cheerio");
var Promise=require("bluebird");
var baseUrl="http://www.imooc.com/learn/";
var courses=[637,348,259,197,134,75];

function printCoursesInfo(data){
	data.forEach(function(course){
		console.log("有"+course.number+"学习了"+course.title+"\n");
	})
	data.forEach(function(course){
		console.log("###"+course.title+"\n");
		course.videos.forEach(function(item){
			console.log(item.chapterTitle+"\n");
			item.videos.forEach(function(item){
				console.log("  【"+item.id+"】  "+item.videoTitle+"\n");
			})
		})
	})
}

function filterChapters(data){
	var $=cheerio.load(data);
	var chapters=$(".chapter");
	var title=$(".course-infos .hd h2").text();
	var number=parseInt($($(".course-infos .meta-value strong")[3]).text().trim(),10);
	var courseData={
		title:title,
		number:number,
		videos:[]
	};
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
		courseData.videos.push(chapterObj);
	})
	return courseData;
}

function promiseGetPage(url){
	return new Promise(function(resolve,reject){
		console.log("正在下载页面 "+url);
		http.get(url,function(res){
			var html="";
			res.on("data",function(data){
				html+=data;
			})
			res.on("end",function(){
				resolve(html);
			})
		}).on("error",function(e){
			reject(e);
			console.log("数据错误");
		})
	})
}

var coursesFun=[];
courses.forEach(function(item){
	coursesFun.push(promiseGetPage(baseUrl+item));
})

Promise.all(coursesFun)
	.then(function(pages){
		var courses=[];
		pages.forEach(function(page){
			courses.push(filterChapters(page));
		})
		courses.sort(function(a,b){
			return a.number<b.number;
		})
		printCoursesInfo(courses);
	})