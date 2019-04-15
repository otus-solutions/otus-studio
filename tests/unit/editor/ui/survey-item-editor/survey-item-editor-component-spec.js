describe('SurveyItemEditorComponent Tests', function () {
  var Mock = {};
  var Injections = {};
  var controller;
  var scope = {
    $on: function(){}
  };
  Mock.style = {"background-color":"#E88024"};

  beforeEach(function () {
    angular.mock.module('studio', function ($provide) {
      $provide.value('$scope', scope)
    })
  });

  beforeEach(function () {
    inject(function (_$injector_, _$controller_) {
      controller = _$controller_('otusSurveyItemEditorCtrl');
    });

    spyOn(scope, '$on');
  });

  it('should define controller', function () {
    expect(controller).toBeDefined();
    expect(controller.$onInit).toBeDefined();
    expect(controller.getItem).toBeDefined();
    expect(controller.getQuestionId).toBeDefined();
    expect(controller.getStyle).toBeDefined();
  });

  it('should getStyle method return style', function () {
    controller.$onInit();
    expect(scope.$on).toHaveBeenCalledTimes(2);
    expect(scope.$on.calls.allArgs()).toEqual([["surveyItemSelected", jasmine.anything()],["clearSurveyItemSelected", jasmine.anything()]]);
    expect(controller.getStyle(1)).toEqual({});
    controller.index = 1;
    expect(controller.getStyle(1)).toEqual(Mock.style);
  });
});
