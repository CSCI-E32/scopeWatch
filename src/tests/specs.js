describe('numVal', function(){
  var numVal;
  beforeEach(module('myApp'));
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
  beforeEach(module('myApp'));
  beforeEach(function(){
    module(function($provide){
      $provide.value('numVal', 1);
    });
    inject(function($injector) {
      numFact = $injector.get('numFact');
    });
  });
  it('should be one more than numVal', function(){
    expect(numFact).toBe(2);
  });
});

describe('numSvc', function(){
  var numSvc;
  beforeEach(module('myApp'));
  beforeEach(function(){
    module(function($provide){
      $provide.factory('numFact', function(){ return 2; });
    });
    inject(function($injector){
      numSvc = $injector.get('numSvc');
    });
  });
  describe('addOne', function(){
    it('should add one to the value of num', function(){
      expect(numSvc.num).toBe(2);
      numSvc.addOne();
      expect(numSvc.num).toBe(3);
    });
  });
});
