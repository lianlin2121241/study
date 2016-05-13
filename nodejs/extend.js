function extend(subClass,superClass){
	var F=function(){};
	F.prototype=superClass.prototype;
	subClass.prototype=new F();
	subClass.prototype.constructor=subClass;
	subClass.superclass=superClass.prototype;
	if(superClass.prototype.constructor==Object.prototype.constructor){
		superClass.prototype.constructor=superClass;
	}
}

function Person(name){
	this.name=name;
}
Person.prototype={
	getName:function(){
		return this.name;
	}
}

function Chinese(name,nation){
	Person.call(this,name);
	this.nation=nation;
}
extend(Chinese,Person);
Chinese.prototype.getNation=function(){
	return this.nation;
}

var chinesePerson=new Chinese("lele","China");
console.log(chinesePerson);
console.log(chinesePerson.getName());
console.log(chinesePerson.getNation());