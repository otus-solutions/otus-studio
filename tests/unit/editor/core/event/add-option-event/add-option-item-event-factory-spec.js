describe('AddOptionItemEventFactory suite', function () {

  var factory, event;
  var Mock = {};

  beforeEach(function() {

    mockWorkspace();

    angular.mock.module('studio',function ($provide) {
      $provide.value('WorkspaceService',Mock.workspace);
    });

    angular.mock.inject(function(_$injector_) {

      mockTimeQuestionFactory(_$injector_);

      factory = _$injector_.get('AddOptionItemEventFactory');
    });

    spyOn(factory, 'create').and.callThrough();

  });

  it('factoryExistence check', function () {
    expect(factory).toBeDefined();
  });
  
  describe('factoryInstance', function() {
    beforeEach(function() {
      event = factory.create();
      event.execute(Mock.question, jasmine.any(String), jasmine.any(String));
    });

    it('factoryMethodExistence check', function () {
      expect(factory.create).toBeDefined();
    });

    it('create method should ', function () {    
      expect(factory.create).toHaveBeenCalledTimes(1);
    });

    it('should return an instance of AddOptionItemEvent', function() {
      expect(event.constructor.name).toBe('AddOptionItemEvent');
    });
    
    it('should return an object with execute method', function () {
      expect(event.execute).toBeDefined();
    })
  });
  
  function mockTimeQuestionFactory($injector) {
    Mock.TimeQuestionFactory = $injector.get('TimeQuestionFactory');
    Mock.question = Mock.TimeQuestionFactory.create('TimeQuestion', jasmine.any(String));
  }

  function mockWorkspace() {
    Mock.workspace = {
      workspace: {
        isdb: {
          userEdits: {
            store: function(self) {
              return true;
            }
          }
        }
      },
      saveWork: function() {
        return true;
      }
    };
  }

});
