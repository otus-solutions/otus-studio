describe('FillingRulesEditorWidgetFactory', function() {
  var Mock = {};
  var factory;
  var validator = 'mandatory';
  var directive;

  beforeEach(function() {
    angular.mock.module('studio');

    mockElement();

    inject(function($injector) {
      mockWidgetScope($injector);

      factory = $injector.get('FillingRulesEditorWidgetFactory', {
        AddFillingRulesEventFactory: mockAddFillingRulesEventFactory(
          $injector),
        RemoveFillingRulesEventFactory: mockRemoveFillingRulesEventFactory(
          $injector),
        OtusFillingRulesWidgetFactory: mockOtusFillingRulesWidgetFactory(
          $injector),
        UpdateFillingRulesEventFactory: mockUpdateFillingRulesEventFactory(
          $injector)
      });

    });

    widget = factory.create(Mock.scope, Mock.element);
  });

  describe('Interface description', function() {

    // it('should return a defined element', function() {
    //     expect(widget.getElement()).toBeDefined();
    // });
    //
    // it('should return a defined parent', function() {
    //     expect(widget.getParent()).toBeDefined();
    // });
    //
    // it('should return a defined item', function() {
    //     expect(widget.getItem()).toBeDefined();
    // });
    //
    // it('should return a defined checkIfShow', function() {
    //     expect(widget.checkIfShow()).toBeDefined();
    // });
    //
    // xit('should create an object and return Item', function() {
    //     expect(widget.getItem()).toEqual(mockParentWidget.getItem());
    // });

  });


  describe('a validator checkIfShow', function() {

    beforeEach(inject(function($rootScope, $compile) {
      var template =
        '<otus:mandatory-validator></otus:mandatory-validator>';
      var scope = $rootScope;
      $compile(template)(scope);
    }));

    // it('template should be true with checkIfShow mandatory', function() {
    //   expect(widget.checkIfShow(validator)).toBe(true);
    // });

    // it('test if variable mandatory validator should be equal Element',
    //   function() {
    //     expect(Mock.OtusFillingRulesWidgetFactory.create(validator)).toEqual(
    //       template);
    //   });

  });

  function mockElement() {
    Mock.element = {
      find: function() {
        return angular.element(document.createElement('li'));
      }
    };
  }

  function mockWidgetScope($injector) {
    Mock.scope = {
      class: '',
      $parent: {
        widget: mockParentWidget($injector)
      },
      $on: function() {}
    };

    spyOn(Mock.scope, '$on');

    return Mock.scope;
  }

  function mockParentWidget($injector) {
    Mock.parentWidget = {
      getItem: function() {
        return mockItem($injector);
      }
    };
    return Mock.parentWidget;
  }

  function mockAddFillingRulesEventFactory($injector) {
    Mock.AddFillingRulesEventFactory = $injector.get(
      'AddFillingRulesEventFactory');
    Mock.AddFillingRulesEventFactory.create = function() {
      return mockAddFillingRulesEvent();
    };
    return Mock.AddFillingRulesEventFactory;
  }

  function mockAddFillingRulesEvent() {
    return {
      execute: function() {}
    };
  }

  function mockRemoveFillingRulesEventFactory($injector) {
    Mock.RemoveFillingRulesEventFactory = $injector.get(
      'RemoveFillingRulesEventFactory');
    return Mock.RemoveFillingRulesEventFactory;
  }

  function mockOtusFillingRulesWidgetFactory($injector) {
    Mock.OtusFillingRulesWidgetFactory = $injector.get(
      'OtusFillingRulesWidgetFactory');
    return Mock.OtusFillingRulesWidgetFactory;
  }

  function mockUpdateFillingRulesEventFactory($injector) {
    Mock.UpdateFillingRulesEventFactory = $injector.get(
      'UpdateFillingRulesEventFactory');
    return Mock.UpdateFillingRulesEventFactory;
  }

  function mockItem($injector) {
    Mock.item = $injector.get('SurveyItemFactory').create('DecimalQuestion',
      'Q1');
    return Mock.item;
  }

});
