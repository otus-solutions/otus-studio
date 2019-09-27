describe('AddSurveyItemGroupEventFactory_UnitTests_Suite', function () {

  var factory;
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');
    angular.mock.inject(function ($injector) {
      Injections.WorkspaceService = $injector.get('WorkspaceService');
      factory = $injector.get('AddSurveyItemGroupEventFactory', Injections);
    });
  });

  it('factoryExistenceCheck', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence_check', function () {
    expect(factory.create).toBeDefined();
  });

  it('createMethod_should_create_an_instance_of_ AddSurveyItemGroupEvent', function () {
    let addSurveyItemGroupEvent = factory.create();
    expect(typeof addSurveyItemGroupEvent.execute).toBe('function');
  });
});
