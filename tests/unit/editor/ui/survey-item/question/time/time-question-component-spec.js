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
  var mockAddOption;
  var mockRemoveOption;
  var mockUpdateOption;
  beforeEach(function() {
    angular.mock.module('studio');
  });

  beforeEach(function() {
    mockAddOption = {
      create: function() {
        return {
          execute: function(item, name, value) {
            return new Object();
          }
        };
      }
    }
    mockRemoveOption = {
      create: function() {
        return {
          execute: function(item, name) {
            return new Object();
          }
        };
      }
    }
    mockUpdateOption = {
      create: function() {
        return {
          execute: function() {
            return new Object();
          }
        };
      }
    }

    angular.mock.module(function($provide) {
      $provide.value('AddOptionItemEventFactory', mockAddOption);
      $provide.value('UpdateOptionItemEventFactory', mockUpdateOption);
      $provide.value('RemoveOptionItemEventFactory', mockRemoveOption);
    });
  });

  beforeEach(
    angular.mock.inject(function(_$injector_, _$rootScope_, _$compile_, _$controller_, $templateCache) {
      /* Injectable mocks */
      var injections = {
        AddOptionItemEventFactory: _$injector_.get('AddOptionItemEventFactory'),
        UpdateOptionItemEventFactory: _$injector_.get('UpdateOptionItemEventFactory'),
        RemoveOptionItemEventFactory: _$injector_.get('RemoveOptionItemEventFactory')
      }
      $templateCache.put('app/editor/ui/survey-item/question/time/time-question-template.html', TEMPLATE);

      mockTimeQuestionFactory(_$injector_);
      mockController(_$controller_, injections);

      scope = _$rootScope_.$new();
      scope.item = question;
      element = angular.element('<time-question item="item"></time-question>');
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
    it('should render component', function() {
      expect($controller.item).not.toBeNull();
      expect($controller.item).toEqual(question);
    });
  });

  function mockTimeQuestionFactory($injector) {
    Mock.TimeQuestionFactory = $injector.get('TimeQuestionFactory');
    question = Mock.TimeQuestionFactory.create('TimeQuestion', jasmine.any(String));
  }

  function mockController(_$controller_, injections) {
    $controller = _$controller_('TimeQuestionController');
    $controller.item = question;
    $controller.$onInit();
    $controller.item.options.data = undefined;
    $controller.$onInit();
    $controller.updateOption(jasmine.any(String), jasmine.any(String));
  }


});
