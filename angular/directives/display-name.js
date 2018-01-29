app.directive('displayName', ['$http', function($http) {
 return {
  restrict: 'E',
  template: '{{myData}}',
  controller: function($scope) {
   $http.get($scope.object).then(function(response) {
    $scope.myData = response.data.name;
    if (response.data.name == "") {
     $scope.myData = response.data.aliases[0];
    }
   });
  }
 }
}]);