var myApp=angular.module("myApp",[])

/*myApp.service("Weather",["$http",function(){
	var apiKey="";
	this.setApiKey=function(key){
		if(key) this.apiKey=key
	}
	return{

	}
}])*/

myApp.config(function(WeatherProvider){
	WeatherProvider.setApiKey("bed9d2f021ea81b6");
})

myApp.provider("Weather",function(){
	var apiKey="";
	this.setApiKey=function(key){
		if(key) this.apiKey=key
	}
	this.getUrl=function(type,ext){
		return  "http://api.wunderground.com/api/" + this.apiKey + "/" + type + "/q/" + ext + '.json';
	}
	this.$get=function($q,$http){
		var self=this;
		return {
			getWeatherForecast:function(city){
				var d=$q.defer();
				$http({
					method:"GET",
					url:self.getUrl("forecast",city),
					cache:true
				})
				.success(function(data){
					d.resolve(data.forecast.simpleforecast);
				})
				.error(function(err){
					d.reject(err);
				})
				return d.promise;
			}
		}
	}
})

myApp.controller("mainController",["$scope","$timeout","Weather",function($scope,$timeout,Weather){
	$scope.data={};

	var updateTime=function(){
		$scope.data.raw=new Date();
		$timeout(updateTime,1000);
	}

	updateTime();

	$scope.weather={};
	Weather.getWeatherForecast("CA/San_Francisco")
	.then(function(data){
		$scope.weather.forecast=data;
	},function(){

	})
}])