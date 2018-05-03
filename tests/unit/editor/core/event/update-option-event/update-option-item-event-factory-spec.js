describe('UpdateOptionItemEventFactory', function() {
  var Mock = {};
  var factory, event;
  var mockWorkService;
  var question;

  beforeEach(function() {
    angular.mock.module('studio');
  });

  beforeEach(function() {
    mockWorkService = {
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
    angular.mock.module(function($provide) {
      $provide.value('WorkspaceService', mockWorkService);
    });

  })

  beforeEach(function() {
    angular.mock.inject(function(_$injector_) {
      factory = _$injector_.get('UpdateOptionItemEventFactory');
      mockTimeQuestionFactory(_$injector_);
      event = factory.create();
      event.execute();
    });
  });

  describe('create method', function() {
    it('should return an instance of UpdateOptionItemEvent', function() {
      expect(event.constructor.name).toBe('UpdateOptionItemEvent');
    });

    it('should return an object with execute method', function() {
      expect(event.execute).toBeDefined();
    });
  });


  function mockTimeQuestionFactory($injector) {
    Mock.TimeQuestionFactory = $injector.get('TimeQuestionFactory');
    question = Mock.TimeQuestionFactory.create('TimeQuestion', jasmine.any(String));
  }
});
