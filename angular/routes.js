app.config(['$routeProvider', function($routeProvider) {
 $routeProvider
  .when('/', {
   templateUrl: 'views/data.html',
   controller: 'mainController',
   controllerAs: 'apiData'
  })
  .when('/details/:type/:url*', {
   templateUrl: 'views/details.html',
   controller: 'detailsController',
   controllerAs: 'detailData'
  })
  // .when('/match/:round/:date/:team1/:team2/:score1/:score2', {

  //  templateUrl: 'views/matchView.html',
  //  controller: 'matchController',
  //  controllerAs: 'matchView',
  //  cache: false
  // })

 .otherwise({
  template: '<h1>404 page not found</h1>'
 });
}])