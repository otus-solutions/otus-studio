describe('MoveSurveyItemEventFactory', function() {
  var factory, event;
  var Injections = {};

  beforeEach(function() {
    angular.mock.module('studio', function ($provide) {
      $provide.value('WorkspaceService', {
        getSurvey: function(){},
        saveWork: function(){},
        workspace:{
          isdb:{
            userEdits:{
              store: function () {}
            }
          }
        }
      })
    });

    inject(function(_$injector_) {
      Injections.WorkspaceService = _$injector_.get("WorkspaceService");
      Injections.MoveSurveyItemService = _$injector_.get("MoveSurveyItemService");
      factory = _$injector_.get('MoveSurveyItemEventFactory', Injections);
    });

    event = factory.create();
    spyOn(Injections.WorkspaceService, "getSurvey").and.returnValue({});
    spyOn(Injections.MoveSurveyItemService, "execute");
  });

  describe('create method', function() {
    it('should return an instance of MoveSurveyItemEvent', function() {
      expect(event.constructor.name).toBe('MoveSurveyItemEvent');
    });

    it('should return an object with execute method', function() {
      expect(event.execute).toBeDefined();
      event.execute({templateID: "TST1"})
    });
  });
});
