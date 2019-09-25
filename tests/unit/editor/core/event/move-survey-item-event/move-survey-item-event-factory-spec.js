describe('MoveSurveyItemEventFactory', function() {
  var factory, event;
  var Injections = {};

  beforeEach(function() {
    angular.mock.module('studio');

    inject(function(_$injector_, $rootScope) {
      Injections.$rootScope = $rootScope.$new();
      Injections.WorkspaceService = _$injector_.get("WorkspaceService");
      Injections.MoveSurveyItemService = _$injector_.get("MoveSurveyItemService");
      Injections.SurveyItemGroupService = _$injector_.get("SurveyItemGroupService");
      factory = _$injector_.get('MoveSurveyItemEventFactory', Injections);
    });

    event = factory.create();
    spyOn(Injections.WorkspaceService, "getSurvey").and.returnValue({});
    spyOn(Injections.MoveSurveyItemService, "execute");
    spyOn(Injections.SurveyItemGroupService,"getGroup");
  });

  it('factoryExistence check ', function () {
    expect(factory).toBeDefined();
  });

  describe('create method', function() {
    it('should return an instance of MoveSurveyItemEvent', function() {
      expect(event.constructor.name).toBe('MoveSurveyItemEvent');
    });

    it('should return an object with execute method', function() {
      expect(event.execute).toBeDefined();
    });
  });
});
