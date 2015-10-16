var app = angular.module('scopeWatch', []);

app.controller('ControllerOne', ['$scope', 'numSvc', function($scope, numSvc){
  this.num = numSvc.num;
  var vm = this;

  $scope.$watch(function(){
    return vm.num;
  }, function (newVal, oldVal) {
    numSvc.num = newVal;
  });

  vm.addOne = function(){
    console.log("controller addOne");
    this.num++;
  };

}]);

app.controller('ControllerTwo', ['$scope', 'numSvc', function($scope, numSvc){
  this.num = numSvc.num;
  var vm = this;

  $scope.$watch(function(){
    return numSvc.num;
  }, function (newVal, oldVal) {
    vm.num = newVal;
  });

}]);

app.value('numVal', 1);

app.factory('numFact', ['numVal', function(numVal){
  return {
    num: numVal + 1,
    somethingelse: 22
  };
}]);

app.service('numSvc', ['numFact', function(numFact){
  this.num = numFact.num;

  this.addOne = function(){
    console.log("numScv.addOne()");
    this.num++;
  };

//  return this;
}]);
