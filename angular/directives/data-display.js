app.directive('displayData',function(){
  return{
    restrict: 'E',
    templateUrl : 'views/dataDisplay.html',
    controller: 'mainController',
    controllerAs: 'apiData'
  }
});