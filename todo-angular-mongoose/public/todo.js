var myTodo = angular.module("myTodo", []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get("/api/todos").success(function(data){
		$scope.todos = data;
	}).error(function(data){
		console.log("error", error);
	});

	$scope.createTodo = function(){
		$http.post("/api/todos", $scope.formData).success(function(data) {
			$scope.formData = {};
			$scope.todos = data;
		}).error(function(data){
			console.log("error", error);
		});
	}

	$scope.deleteTodo = function(id){

	}
}