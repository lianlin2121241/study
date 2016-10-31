function getWeightByType(value) {
	const WEIGHT_NULL_UNDEFINED=1;
	const WEIGHT_PRIMITIVE=2;
	const WEIGHT_OBJECT_FUNCTION=4;

	if(value==null){
		return WEIGHT_NULL_UNDEFINED;
	}
	if(typeof value=="object"||typeof value=="function"){
		return WEIGHT_OBJECT_FUNCTION;
	}
	return WEIGHT_PRIMITIVE;
}

function getMapValues(map){
	return [...map.values()]
}

function getPlainObjectVlaues(object){
	return Object.keys(object).map(function(key){
		return object[key];
	})
}

function getCollectionValues(collection){
	if(collection instanceof Array){
		return collection;
	}
	if(collection instanceof Map){
		return getMapValues(collection);
	}
	return getPlainObjectVlaues(collection);
}

function reduceWeightSum(collection){
	let collectionValues;
	collectionValues=getCollectionValues(collection);
	return collectionValues.reduce(function(sum,item){
		return sum+getWeightByType(item);
	},0);
}

let myArray=[null,{},15];
let myMap=new Map([["function",function(){}],["stringKey","stringValue"]]);
let myObject={"stringKey":"Hello world","stringKey1":"Hello world1"};
console.log("myArray权重为："+reduceWeightSum(myArray));
console.log("myMap权重为："+reduceWeightSum(myMap));
console.log("myObject权重为："+reduceWeightSum(myObject));