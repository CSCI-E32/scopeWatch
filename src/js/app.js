var app = angular.module('myApp', []);

app.controller('ControllerOne', ['$scope', 'numSvc', function($scope, numSvc){
  this.num = numSvc.num;
  var that = this;

  $scope.$watch(function(){ return that.num; }, function (newVal, oldVal) {
    numSvc.num = newVal;
  });

  this.addOne = function(){
    numSvc.addOne();
  };


}]);

app.controller('ControllerTwo', ['$scope', 'numSvc', function($scope, numSvc){
  this.num = numSvc.num;
  var that = this;

  $scope.$watch(function(){ return numSvc.num; }, function (newVal, oldVal) {
    that.num = numSvc.num
  });


}]);

app.value('numVal', 1);

app.factory('numFact', ['numVal', function(numVal){
  return numVal + 1;
}]);

app.service('numSvc', ['numFact', function(numFact){
  this.num = numFact;

  this.addOne = function(){
    this.num++;
  };
}]);
