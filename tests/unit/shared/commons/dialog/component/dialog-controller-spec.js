describe('Dialog Controller Tests', function () {
  var Mock = {};
  var controller;
  var controllerWithDimension;
  var DIALOG = "DIALOG";
  var DIMENSION = {width: '100px'};

  beforeEach(function () {
    mockData();
    angular.mock.module('studio');

    inject(function (_$controller_) {
      controller = _$controller_('dialogController', {data:Mock.data});
      controllerWithDimension = _$controller_('dialogController', {data:Mock.dataEmpty});
    });
  });

  it('should defined controller', function () {
    expect(controller).toBeDefined();
    expect(controller.isAvailableImage).toBeDefined();
    expect(controller.dialogDimensions).toEqual({'min-height':'200px', 'min-width':'300px'});
    expect(controller.HEADER).toEqual(DIALOG);
    expect(controller.TITLE).toEqual(DIALOG);
    expect(controller.TEXT).toEqual(DIALOG);
    expect(controller.ariaLabel).toEqual(DIALOG);
    expect(controller.IMG).toEqual(DIALOG);
    expect(controller.isAvailableImage()).toBeTruthy();
    expect(controller.STYLE).toEqual(DIALOG);
    expect(controller.BUTTONS).toEqual([DIALOG]);
    expect(controller.cancel).toEqual(DIALOG);
  });

  it('should test', function () {
    expect(controllerWithDimension.dialogDimensions).toEqual(DIMENSION)
  });

  function mockData() {
    Mock.dataEmpty = {
      dimensionsDialog: DIMENSION
    }
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
