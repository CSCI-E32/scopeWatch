describe('numVal', function(){
  var numVal;
  beforeEach(module('scopeWatch'));
  beforeEach(function(){
    inject(function($injector) {
      numVal = $injector.get('numVal');
    });
  });
  it('should initialize to 1', function(){
    expect(numVal).toBe(1);
  });
});

describe('numFact', function(){
  var numFact;
  beforeEach(module('scopeWatch'));
  beforeEach(function(){
    module(function($provide){
      $provide.value('numVal', 1);
    });
    inject(function($injector) {
      numFact = $injector.get('numFact');
    });
  });
  it('should be one more than numVal', function(){
    expect(numFact.num).toBe(2);
  });
});

describe('numSvc', function(){
  var numSvc;
  beforeEach(module('scopeWatch'));
  beforeEach(function(){
    module(function($provide){
      $provide.factory('numFact', function(){ return {num: 2}; });
    });
    inject(function($injector){
      numSvc = $injector.get('numSvc');
    });
  });
  it('should initialize to the same value as numFact', function(){
    var numFact;
    inject(function($injector){
      numFact = $injector.get('numFact');
    });
    expect(numSvc.num).toBe(numFact.num);
  });
  describe('addOne', function(){
    it('should add one to the value of num', function(){
      expect(numSvc.num).toBe(2);
      numSvc.addOne();
      expect(numSvc.num).toBe(3);

    });
  });
});

describe('ControllerOne', function(){
  var controllerOne;
  var scope;
  beforeEach(module('scopeWatch'));
  beforeEach(function(){
    module(function($provide){
      $provide.factory('numFact', function(){ return {num: 2}; });
    });
    inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      controllerOne = $controller('ControllerOne', {$scope: scope});
    });
  });
  describe("addOne", function(){
    it('should update the numSvc value when ControllerOne.addOne is called', function(){
      var numScv;
      inject(function($injector){
        numSvc = $injector.get('numSvc');
      });
      expect(numSvc.num).toBe(2);
      controllerOne.addOne();
      scope.$digest();
      expect(numSvc.num).toBe(3);

    });
  });
});
