describe('timeQuestion component', function() {

  var TEMPLATE = '<link href="app/editor/ui/survey-item/question/time/time-question.css" rel="stylesheet" /><md-content layout-padding><div layout="row" flex>' +
    '<div layout="row" flex><button class="md-fab md-raised md-mini md-button md-layoutTheme-theme md-ink-ripple" type="button" aria-label="Hora Atual" ng-disabled="!$ctrl.button">' +
    '<md-icon class="ng-scope md-layoutTheme-theme material-icons">access_time</md-icon>' +
    '</button>' +
    '<md-input-container class="md-block" flex-gt-sm="75">' +
    '<input type="time" aria-label="Tempo" min="0" max="4999">' +
    '</md-input-container>' +
    '</div>' +
    '<md-input-container class="md-block" flex-gt-sm="45" layout-margin>' +
    '<md-switch class="md-primary" ng-model="$ctrl.button" ng-change="$ctrl.updateOption(\'hide-button\', $ctrl.button)" layout-align="start start">' +
    '<span class="md-body-1">Botão de Hora</span>' +
    '<md-tooltip>Exibir o botão de hora atual</md-tooltip>' +
    '</md-switch>' +
    '</md-input-container>' +
    '</div>' +
    '</md-content>';

  var Mock = {};
  var Injections = {};
  var question;
  var element, scope;
  var component = {};
  var $controller;
  beforeEach(function() {
    angular.mock.module('studio');
  });

  beforeEach(
    angular.mock.inject(function(_$injector_, _$rootScope_, _$compile_, _$controller_, $templateCache) {

      /* Injectable mocks */
      var injections = {
        AddOptionItemEventFactory : _$injector_.get('AddOptionItemEventFactory'),
        UpdateOptionItemEventFactory : _$injector_.get('UpdateOptionItemEventFactory'),
        RemoveOptionItemEventFactory :_$injector_.get('RemoveOptionItemEventFactory')
      }
      $templateCache.put('app/editor/ui/survey-item/question/time/time-question-template.html', TEMPLATE);

      mockController(_$controller_,injections);
      mockTimeQuestionFactory(_$injector_);

      scope = _$rootScope_.$new();
      scope.item = {name: "Tiago"};
      element = angular.element('<time-question item="$ctrl.item"></time-question>');
      component = _$compile_(element)(scope);
      scope.$digest();
    }));


  describe('tests component', function() {
    it('should render component', function() {

      expect(component[0]).not.toBeNull();
      expect(component[0]).toEqual(element[0]);

    });

  });

  describe('tests controller', function() {
    var item;
    beforeEach(function() {
      spyOn($controller, 'updateOption');
      item = $controller.updateOption(jasmine.any(String), jasmine.any(Boolean));
    });
    it('should test the functions controller', function() {
        expect($controller.updateOption).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Boolean));
    });
  });

  function mockTimeQuestionFactory($injector) {
    Mock.TimeQuestionFactory = $injector.get('TimeQuestionFactory');
    question = Mock.TimeQuestionFactory.create('TimeQuestion', jasmine.any(String));
  }

  function mockController(_$controller_, injections) {
    $controller = _$controller_('TimeQuestionController', injections);
    $controller.item = question;
    $controller.$onInit();
    $controller.updateOption(jasmine.any(String), jasmine.any(Boolean));
    // $controller._getRuleType();
    $controller.getItem();
    // console.log($controller.getItem());

  }


});
