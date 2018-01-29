app.directive('displayImage',['$http', function($http){
  return{
    restrict: 'E',
    template : '<img class="img-fluid" ng-src="images/{{type}}/{{myData}}.jpg" style="height: 15vmin;" onError=this.style.display="none">',
    scope : {
    	object: '=',
    	type: '@',
    	url: '@'
    },
    controller :  function($scope){
    	if ($scope.url == "no") {
    		$scope.myData = $scope.object;
    	}else{
 $http.get($scope.object).then(function (response) {
      $scope.myData = response.data.name;
  });
		}
    }
  }
}]);