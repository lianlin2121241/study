var app=angular.module("myApp",[])

app.factory('socket', ['$rootScope', function($rootScope){
	var socket=io.connect("http://localhost:8080")
	return {
		on:function(eventName,callback) {
			socket.on(eventName,function() {
				var args=arguments;
				$rootScope.$apply(function() {
					callback.apply(socket,args);
				})
			})
		},
		emit:function(eventName,data,callback) {
			socket.emit(eventName,data,function() {
				var args=arguments;
				$rootScope.$apply(function() {
					if(callback){
						callback.apply(socket,args);
					}
				})
			})
		}
	}
}])

app.controller('MainCtrl', ['$scope','socket', function($scope,socket){
	$scope.message='';
	$scope.messages=[];
	socket.on("new:msg",function(message) {
		$scope.messages.push(message);
	})

	$scope.broadcast=function() {
		socket.emit('broadcast:msg',{message:$scope.message});
		$scope.messages.push($scope.message);
		$scope.message='';
	}
}])