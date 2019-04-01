describe('Item Container Component Tests', function () {
  var Mock = {};
  var Injections = {};
  var controller;
  var controllerWithDimension;
  var DIALOG = "DIALOG";
  var DIMENSION = {width: '100px'};

  beforeEach(function () {
    mockData();
    angular.mock.module('studio');

    inject(function (_$injector_, _$controller_) {
      Injections = {
        'RemoveSurveyItemEventFactory' : _$injector_.get('RemoveSurveyItemEventFactory'),
        '$mdDialog': _$injector_.get('$mdDialog'),
        'DialogService': _$injector_.get('DialogService'),
        'WorkspaceService': _$injector_.get('WorkspaceService'),
        '$window': _$injector_.get('$window'),
        '$mdSelect': _$injector_.get('$mdSelect')
      };
      controller = _$controller_('itemContainerCtrl', Injections);

    });

  });

  it('should defined controller', function () {
    expect(controller).toBeDefined();
    expect(controller.changeState).toBeDefined();
    expect(controller.deleteSurveyItem).toBeDefined();
    expect(controller.scrollSurveyItem).toBeDefined();
    expect(controller.$onInit).toBeDefined();
  });

  it('should call onInit method', function () {
    controller.$onInit();
    expect(controller.css).toEqual({});
    expect(controller.event).toEqual({});
    expect(controller.isToShow).toBeFalsy()
    expect(controller.template.icon).toEqual('expand_more');
  });

  it('should change state method', function () {
    controller.$onInit();
    expect(controller.isToShow).toBeFalsy()
    expect(controller.template.icon).toEqual('expand_more');
    controller.changeState();
    expect(controller.isToShow).toBeTruthy();
    expect(controller.template.icon).toEqual('expand_less');
    controller.changeState();
    expect(controller.isToShow).toBeFalsy()
    expect(controller.template.icon).toEqual('expand_more');

  });


  function mockData() {

    Mock.data = {
      header: "DIALOG",
      title: "DIALOG",
      text: "DIALOG",
      ariaLabel: "DIALOG",
      img: "DIALOG",
      style: "DIALOG",
      buttons: ["DIALOG"],
      cancel: "DIALOG",
    }
  }



});
