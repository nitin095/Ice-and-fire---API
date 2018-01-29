var app = angular.module('iceAndFire', ['ngRoute', 'bw.paging']);

app.controller('mainController', ['$http', function($http) {
 var main = this;
 this.books = [];
 this.characters = [];
 this.houses = [];
 this.date = "";
 this.show = true;
 this.cultures = [];
 this.bornYears = [];
 this.regions = [];
 this.sort = "name";
 this.sortButton = "Sort by";
 this.sortButtonColor = "";

 //function to 'GET' json data by providing a url
 this.loadData = function(url, pageNumber, filter) {
   if (filter === '&name=') {
    filter = '';
   }
   $http({
    method: 'GET',
    url: 'https://www.anapioficeandfire.com/api/' + url + '?page=' + pageNumber + '&pageSize=48' + filter
   }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    if (url === 'books') {
     main.books = response.data;
    }
    if (url === 'characters') {
     console.log(response.data);
     main.characters = response.data;
     main.getAllCultures();
     main.getAllBornYears();
     main.checkNames();
    }
    if (url === 'houses') {
     main.houses = response.data;
     main.getAllRegions();
    }
   }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("some error occurred. Check the console.");
    console.log(response);
   });
  } //end loadData
 this.loadData('books', '1', '');
 this.loadData('characters', '1', '');
 this.loadData('houses', '1', '');

 //function to checks for empty character name
 this.checkNames = function() {
  for (x in this.characters) {
   if (this.characters[x].name == "") {
    this.characters[x].name = this.characters[x].aliases[0];
   }
  }
 };

 //function to return type array 
 this.getType = function(type) {
  if (type == 'books') {
   return this.books;
  }
  if (type == "characters") {
   return this.characters;
  }
  if (type == 'houses') {
   return this.houses;
  }
 };

 //function to get all cultures of characters
 this.getAllCultures = function() {
  for (var i = 0; i < this.characters.length; i++) {
   this.cultures[this.cultures.length] = this.characters[i].culture;
   this.cultures = [...new Set(this.cultures)];
  }
 };

 //function to get all born years of characters
 this.getAllBornYears = function() {
  for (var i = 0; i < this.characters.length; i++) {
   this.bornYears[this.bornYears.length] = this.characters[i].born;
   this.bornYears = [...new Set(this.bornYears)];
  }
 };

 //function to get all religions of characters
 this.getAllRegions = function() {
  for (var i = 0; i < this.houses.length; i++) {
   this.regions[this.regions.length] = this.houses[i].region;
   this.regions = [...new Set(this.regions)];
  }
 };

 //function to change sortby button text and color
 this.sortBy = function(option, buttonText) {
  this.sort = option;
  this.sortButton = "Sort by: " + buttonText;
  this.sortButtonColor = "rgba(209,33,33,1)";
 };

 //function to filter houses
 this.houseFilter = function(words, titles, seats, extinct, weapons) {
  this.loadData('houses', '1', '&hasWords=' + words + '&hasTitles=' + titles + '&hasSeats=' + seats + '&hasDiedOut=' + extinct + '&hasAncestralWeapons=' + weapons);
 };

 //to always show navbar, home and counter on home page 
 angular.element(document.querySelector('#ftco-navbar')).show();
 angular.element(document.querySelector('#section-counter')).show();
 angular.element(document.querySelector('#section-home')).show();

}]); 
//end mainController



app.controller('detailsController', ['$http', '$routeParams', function($http, $routeParams) {
 this.url = $routeParams.url;
 this.type = $routeParams.type;
 this.object = [];
 this.lordName = "";
 this.heirName = "";
 this.overLordName = "";
 this.founderName = "";
 this.father = "";
 this.mother = "";
 this.spouse = "";
 this.show = true;
 this.numberOfCharacters = 100;
 main = this;

 //function to 'GET' json data by providing a url
 this.loadObject = function() {
   $http({
    method: 'GET',
    url: this.url
   }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    main.object = response.data;
    if (main.type == 'houses') {
     main.getNames(response.data.currentLord, response.data.heir, response.data.overlord, response.data.founder);
    }
    if (main.type == 'characters') {
     main.getNamesCharacters(response.data.father, response.data.mother, response.data.spouse);
    }
   }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("some error occurred. Check the console.");
    console.log(response);
   });
  } 
  //end laoldObject
 this.loadObject();

 //function to get names for house
 this.getNames = function(lordUrl, heirUrl, overLordUrl, founderUrl) {
  $http.get(lordUrl).then(function(response) {
   main.lordName = response.data.name;
  });
  $http.get(heirUrl).then(function(response) {
   main.heirName = response.data.name;
  });
  $http.get(overLordUrl).then(function(response) {
   main.overLordName = response.data.name;
  });
  $http.get(founderUrl).then(function(response) {
   main.founderName = response.data.name;
  });
 };

 //function to get names for characters
 this.getNamesCharacters = function(fatherUrl, motherUrl, spouseUrl) {
  $http.get(fatherUrl).then(function(response) {
   main.father = response.data.name;
  });
  $http.get(motherUrl).then(function(response) {
   main.mother = response.data.name;
  });
  $http.get(spouseUrl).then(function(response) {
   main.spouse = response.data.name;
  });
 };

 this.loadMoreCharacters = function() {
  this.numberOfCharacters += 100;
 };

 //to hide home section, navbar and counter on details page
 angular.element(document.querySelector('#ftco-navbar')).hide();
 angular.element(document.querySelector('#section-counter')).hide();
 angular.element(document.querySelector('#section-home')).hide();

}]); //end detailsController
