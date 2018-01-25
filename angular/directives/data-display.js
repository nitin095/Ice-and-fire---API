app.directive('displayData',function(){
  return{
    restrict: 'E',
    templateUrl : 'views/dataDisplay.html',
    controller :  function($scope){
      // console.log("scope is");
       console.log($scope.type);
    },
    controller: 'mainController',
     controllerAs: 'apiData'
  }
});