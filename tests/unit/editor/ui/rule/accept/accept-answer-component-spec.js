describe('otusAcceptAnswer', function() {

  var UNIT_NAME = 'otusAcceptAnswer';
  var QUESTION_ID = 'TEST1';
  var ANSWER = 'test_answer';
  var METADATA = 'test_metadata';
  var COMMENT = 'test_comment';
  var Mock = {};
  var Injections = {};
  var Bindings = {};
  var component = {};

  beforeEach(function() {
    module('studio');

    inject(function(_$componentController_, _$injector_) {

      /* Injectable mocks */
      mockAddFillingRulesEventFactory(_$injector_);
      mockRemoveFillingRulesEventFactory(_$injector_);
      mockUpdateFillingRulesEventFactory(_$injector_);

      mockIntegerQuestionFactory(_$injector_);

      component = _$componentController_(UNIT_NAME, Injections, Bindings);
      $componentController = _$componentController_;
    });
  });


  describe('onInit methods', function() {

    it('should called method isQuestion', function() {
      var question = Mock.IntegerQuestionFactory.create('IntegerQuestion', jasmine.any(String));
      var bindings = {
        item: question
      };
      var component = $componentController(UNIT_NAME, Injections, bindings);

      spyOn(component.item, 'isQuestion');

      component.$onInit();

      expect(component.item.isQuestion).toHaveBeenCalled();

    });


    it('should assign false in data attribute when object accept does not exist', function() {
      var question = Mock.IntegerQuestionFactory.create('IntegerQuestion', jasmine.any(String));
      var bindings = {
        item: question
      };
      var component = $componentController(UNIT_NAME, Injections, bindings);

      component.$onInit();

      expect(component.item.fillingRules.options.accept).not.toBeDefined();
      expect(component.data).toEqual(false);
    });

    it('when object accept exists data attribute must receive the reference value', function() {
      
    });

  });

  function mockAddFillingRulesEventFactory($injector) {
    Mock.AddFillingRulesEventFactory = $injector.get('AddFillingRulesEventFactory');
    Injections.AddFillingRulesEventFactory = Mock.AddFillingRulesEventFactory;
  }

  function mockRemoveFillingRulesEventFactory($injector) {
    Mock.RemoveFillingRulesEventFactory = $injector.get('RemoveFillingRulesEventFactory');
    Injections.RemoveFillingRulesEventFactory = Mock.RemoveFillingRulesEventFactory;
  }

  function mockUpdateFillingRulesEventFactory($injector) {
    Mock.UpdateFillingRulesEventFactory = $injector.get('UpdateFillingRulesEventFactory');
    Injections.UpdateFillingRulesEventFactory = Mock.UpdateFillingRulesEventFactory;
  }

  function mockIntegerQuestionFactory($injector) {
    Mock.IntegerQuestionFactory = $injector.get('IntegerQuestionFactory');
    return Mock.IntegerQuestionFactory;
  }

});
