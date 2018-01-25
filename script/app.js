var app = angular.module('iceAndFire', ['ngRoute','bw.paging']);

app.controller('mainController', ['$http', function($http) {
 var main = this;
 this.books = [];
 this.characters =[];
 this.houses = [];
 this.date = "";
 this.show = true;
 this.cultures = [];
 this.bornYears = [];
 this.regions = [];
 //function to 'GET' json data by providing a url
 this.loadData = function(url,pageNumber,filter) {
  if (filter==='&name=') {
        filter = '';
      }
  console.log("page no. is "+pageNumber+" filter is "+filter);
   $http({
    method: 'GET',
    url: 'https://www.anapioficeandfire.com/api/'+url+'?page='+pageNumber+'&pageSize=50'+filter
   }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log('https://www.anapioficeandfire.com/api/'+url+'?page='+pageNumber+'&pageSize=50'+filter);
    if (url==='books') {
    main.books = response.data;
    }
    if (url==='characters') {
      console.log(response.data);
      main.characters = response.data;
      main.getAllCultures();
      main.getAllBornYears();
    }
    if (url==='houses') {
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
 this.loadData('books','1','');
 this.loadData('characters','1','');
 this.loadData('houses','1','');
 this.getType = function(type){
  if (type=='books') {
    return this.books;
  }
  if (type=="characters") {
    return this.characters;
  }
  if (type=='houses') {
    return this.houses;
  }
 };
 this.getAllCultures = function(){
  for (var i = 0; i < this.characters.length; i++) {
      this.cultures[this.cultures.length] = this.characters[i].culture;
      this.cultures = [...new Set(this.cultures)];
  }
 };
 this.getAllBornYears = function(){
  for (var i = 0; i < this.characters.length; i++) {
      this.bornYears[this.bornYears.length] = this.characters[i].born;
      this.bornYears = [...new Set(this.bornYears)];
  }
 };
  this.getAllRegions = function(){
  for (var i = 0; i < this.houses.length; i++) {
      this.regions[this.regions.length] = this.houses[i].region;
      this.regions = [...new Set(this.regions)];
  }
 };

  this.houseFilter = function(words,titles,seats,extinct,weapons){
     this.loadData('houses','1','&hasWords='+words+'&hasTitles='+titles+'&hasSeats='+seats+'&hasDiedOut='+extinct+'&hasAncestralWeapons='+weapons);
  };

}]); //end mainController



app.controller('detailsController', ['$http','$routeParams', function($http,$routeParams) {
  this.url = $routeParams.url;
  this.type = $routeParams.type;
  this.object = [];
  this.lordName = "";
  this.heirName ="";
  this.overLordName = "";
  this.founderName = "";
  this.father = "";
  this.mother = "";
  this.spouse = "";
  this.show = true;
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
    main.getNames(response.data.currentLord,response.data.heir,response.data.overlord,response.data.founder);
    }
    if (main.type == 'characters') {
      main.getNamesCharacters(response.data.father,response.data.mother,response.data.spouse);
    }
   }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert("some error occurred. Check the console.");
    console.log(response);
   });
  } //end laoldObject
  this.loadObject();
  this.getNames = function(lordUrl,heirUrl,overLordUrl,founderUrl){
    $http.get(lordUrl).then(function (response) {
      main.lordName = response.data.name;
  });
     $http.get(heirUrl).then(function (response) {
      main.heirName = response.data.name;
  });
       $http.get(overLordUrl).then(function (response) {
      main.overLordName = response.data.name;
  });
      $http.get(founderUrl).then(function (response) {
      main.founderName = response.data.name;
  });
  };
  this.getNamesCharacters = function(fatherUrl,motherUrl,spouseUrl){
    $http.get(fatherUrl).then(function (response) {
      main.father = response.data.name;
    });
    $http.get(motherUrl).then(function (response) {
      main.mother = response.data.name;
    });
     $http.get(spouseUrl).then(function (response) {
      main.spouse = response.data.name;
    });
  };
}]); //end detailsController

