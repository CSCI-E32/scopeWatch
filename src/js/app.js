var app = angular.module('myApp', []);

app.controller('ControllerOne', ['$scope', 'something', function($scope, something){
  this.num = something.num;
  var that = this;

  $scope.$watch(function(){ return that.num; }, function (newVal, oldVal) {
    something.num = newVal;
  });


}]);

app.controller('ControllerTwo', ['$scope', 'something', function($scope, something){
  this.num = something.num;
  var that = this;

  $scope.$watch(function(){ return something.num; }, function (newVal, oldVal) {
    that.num = something.num
  });


}]);

app.value('num', 1);
app.factory('something', function(){
  var num = 1;
  return {
    num: num
  };
});
