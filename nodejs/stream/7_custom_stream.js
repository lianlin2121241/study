var stream=require("stream");
var util=require("util");

function ReadStream () {
	stream.Readable.call(this);
}
util.inherits(ReadStream,stream.Readable);

ReadStream.prototype._read=function(size){
	console.log(size);
	this.push("I ");
	this.push("love ");
	this.push("imooc ");
	this.push(null);
}


function WritStream(){
	stream.Writable.call(this);
	this._cached=new Buffer("");
}
util.inherits(WritStream,stream.Writable);

WritStream.prototype._write=function(chunk,encode,cb){
	console.log(chunk.toString());
	console.log(this._cached.toString());
	cb();
}


function Transform(){
	stream.Transform.call(this);
}
util.inherits(Transform,stream.Transform);

Transform.prototype._transform=function(chunk,encode,cb){
	this.push(chunk+"2");
	cb();
}

Transform.prototype._flush=function(cb){
	this.push("transform flush");
	cb();
}

var rs=new ReadStream();
var ws=new WritStream();
var tf=new Transform();

rs.pipe(tf).pipe(ws);