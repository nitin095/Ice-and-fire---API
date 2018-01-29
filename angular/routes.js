app.config(['$routeProvider', function($routeProvider) {
 $routeProvider
  .when('/', {
   templateUrl: 'views/data.html',
   controller: 'mainController',
   controllerAs: 'apiData',
  })
  .when('/details/:type/:url*', {
   templateUrl: 'views/details.html',
   controller: 'detailsController',
   controllerAs: 'detailData'
  })
 .otherwise({
  template: '<h1>404 page not found</h1>'
 });
}])