describe('AddSurveyItemGroupEventFactory_UnitTests_Suite', function () {

  var factory;
  var Injections= [];
  var Mock = {};

  beforeEach(function () {
    angular.mock.module('editor.core');
    angular.mock.inject(function ($injector) {
      Injections.WorkspaceService = $injector.get('WorkspaceService');
      factory = $injector.get('AddSurveyItemGroupEventFactory', Injections);
    });
  });

  it('factoryExistenceCheck', function () {
    console.log(factory);

  });

});
