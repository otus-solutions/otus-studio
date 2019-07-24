describe('studioStaticVariableCtrl Test', function () {
  var Mock = {};
  var controller;

  var EXAMS_NAMES = [
    "URÉIA - SANGUE",
    "CREATININA - SANGUE"
  ];
  var CENTERS = [{ acronym: "RS" }];

  beforeEach(function () {

    _mockInjections();

    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value('$scope', Mock.$scope);
    });
    inject(function (_$controller_) {
      controller = _$controller_('studioStaticVariableCtrl');
      mockBindings();
      spyOn(controller, "onUpdate").and.callThrough();
      spyOn(Mock.$scope, '$on').and.callThrough();
    });
  });

  it('should create method onChangeFilter', function () {
    expect(controller.onChangeFilter).toBeUndefined();
    controller.$onInit();
    expect(controller.onChangeFilter).not.toBeUndefined();
  });

  it('should call method onUpdate', function () {
    controller.$onInit();
    expect(controller.onChangeFilter).toBeDefined();
    controller.onChangeFilter();
    expect(controller.onUpdate).toHaveBeenCalled();
    expect(controller.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should clear examName', function () {
    controller.$onInit();
    controller.clear(Mock.examName);
    expect(controller.onUpdate).toHaveBeenCalled();
    expect(controller.onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should clear not field informed or invalid', function () {
    controller.$onInit();
    controller.clear(null);
    expect(controller.onUpdate).not.toHaveBeenCalled();
    expect(controller.onUpdate).toHaveBeenCalledTimes(0);
  });

  function mockBindings() {
    controller.examsNameList = EXAMS_NAMES;
    controller.centers = CENTERS;
    controller.onUpdate = () => { };

    Mock.examName = "examName";
  }

  function _mockInjections() {
    Mock.$scope = {
      $on: () => { }
    }
  }
});