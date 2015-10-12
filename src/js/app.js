var app = angular.module('scopeWatch', []);

app.controller('ControllerOne', ['$scope', 'numFact', function($scope, numFact){
  this.num = numFact.num;
  var that = this;

  $scope.$watch(function(){
    return that.num;
  }, function (newVal, oldVal) {
    numFact.num = newVal;
  });

  this.addOne = function(){
    this.num++;
  };


}]);

app.controller('ControllerTwo', ['$scope', 'numFact', function($scope, numFact){
  this.num = numFact.num;
  var that = this;


  $scope.$watch(function(){
    return numFact.num;
  }, function (newVal, oldVal) {
    that.num = numFact.num
  });


}]);

app.value('numVal', 1);

app.factory('numFact', ['numVal', function(numVal){
  return {
    num: numVal + 1
  };
}]);

app.service('numSvc', ['numFact', function(numFact){
  this.num = numFact;

  this.addOne = function(){
    this.num++;
  };
}]);
