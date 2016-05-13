var EventEmitter=require("events").EventEmitter;
var life=new EventEmitter();

//eventEmitter默认最多监听10个，多出10个会提示警告，如果不提示警告可以强制设置最大监听个数
life.setMaxListeners(11);

var water=function(who){
	console.log("给  "+who+"  倒水");
}
life.on("play",water);
life.on("play",function(who){
	console.log("给  "+who+"  玩耍2");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍3");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍4");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍5");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍6");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍7");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍8");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍9");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍10");
})
life.on("play",function(who){
	console.log("给  "+who+"  玩耍11");
})


life.on("buy",function(who){
	console.log("给  "+who+"  买包");
})
life.on("buy",function(who){
	console.log("给  "+who+"  买鞋子");
})

//溢出事件监听
life.removeListener("play",water);
//移除所有事件监听
life.removeAllListeners("play");

//执行监听事件，并返回是否有监听
var hasPlayListener=life.emit("play","男人");
var hasBuyListener=life.emit("buy","女人");
var hasSleepListener=life.emit("sleep");

//获取监听个数
console.log(life.listeners("play").length);
console.log(EventEmitter.listenerCount(life,"play"));

console.log(hasPlayListener)
console.log(hasBuyListener)
console.log(hasSleepListener)