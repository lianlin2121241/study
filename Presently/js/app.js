var myApp=angular.module("myApp",['ngRoute'])

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

myApp.config(function($routeProvider){
	$routeProvider
		.when("/",{
			templateUrl:"templates/home.html",
			controller:"mainController"
		})
		.when("/settings",{
			templateUrl:"templates/settings.html",
			controller:"settingsController"
		})
})

myApp.directive("autoFill",function($timeout){
	return {
		restrict:"EA",
		scope:{
			autoFill:"&",
			ngModel:"="
		},
		compile:function(tEle,tAttrs){
			var temp=angular.element('<div class="typeahead">' +
				'<input type="text" autocomplete="off" />' +
				'<ul id="autolist" ng-show="reslist">' +
				'<li ng-repeat="res in reslist" ' +
				'>{{res.name}}</li>' +
				'</ul>' +
				'</div>');
			var input=temp.find("input");
			input.attr("type",tAttrs.type);
			input.attr("ng-model",tAttrs.ngModel);
			tEle.replaceWith(temp);
			return function(scope,tEle,tAttrs,controller){
				var minLength=3,
					timer,
					input=tEle.find("input");
				input.on("keyup",function(){
					var txt=input.val();
					if(txt.length<minLength){
						if(!!timer){
							$timeout.cancel(timer);
						}
						scope.reslist=null;
						return;
					}else{
						if(!!timer){
							$timeout.cancel(timer);
						}
						timer=$timeout(function(){
							scope.autoFill()(txt)
								.then(function(data){
									if (data.length==0) {return}
									scope.reslist=data;
									scope.ngModel=data[0].zmw;
								})
						},300)
					}
				})
				input.on("blur",function(){
					scope.reslist=null;
					scope.$digest();
				})

			}
		}
	}
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

myApp.factory("UserService",["$q","$http",function($q,$http){
	var defaults={
		location:"autoip"
	}
	var service={
		user:{},
		save:function(){
			localStorage.setItem("location",angular.toJson(service.user));
		},
		restore:function(){
			var location=localStorage.getItem("location")|| defaults;
			service.user=angular.fromJson(location);
			return service.user;
		},
		getCityDetails:function(city){
			var d=$q.defer();
			$http({
				method:"GET",
				url:"http://autocomplete.wunderground.com/aq?query=" + city
			})
			.success(function(data){
				d.resolve(data.RESULTS);
			})
			.error(function(err){
				d.reject(err);
			})
			return d.promise;
		}
	}
	service.restore();
	return service
}])

myApp.controller("mainController",["$scope","$timeout","Weather","UserService",function($scope,$timeout,Weather,UserService){
	var user=UserService.user

	$scope.data={};

	var updateTime=function(){
		$scope.data.raw=new Date();
		$timeout(updateTime,1000);
	}

	updateTime();

	$scope.weather={};
	Weather.getWeatherForecast(user.location)	//CA/San_Francisco
	.then(function(data){
		$scope.weather.forecast=data;
	},function(){

	})
}])

myApp.controller("settingsController",["$scope","UserService",function($scope,UserService){
	$scope.user=UserService.user;
	$scope.save=UserService.save;
	$scope.fetchCities=UserService.getCityDetails;
}])