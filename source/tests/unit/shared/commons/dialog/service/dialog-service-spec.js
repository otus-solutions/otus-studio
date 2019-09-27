describe('Dialog Service Tests', function () {
  var Mock = {};
  var Injections = {};
  var service;
  var DIALOG = "DIALOG";
  var DIMENSION = {width: '100px'};

  beforeEach(function () {
    mockData();
    angular.mock.module('studio');

    inject(function (_$injector_) {
      Injections = {
        $mdDialog : _$injector_.get('$mdDialog')
      };
      service = _$injector_.get('DialogService', Injections);
    });

    spyOn(Injections.$mdDialog, 'show').and.callThrough();
    spyOn(Injections.$mdDialog, 'cancel').and.callThrough();
  });

  it('should defined service', function () {
    expect(service).toBeDefined();
    expect(service.show).toBeDefined();
  });

  it('should show dialog with default config', function () {
    service.show({});
    expect(service.data.cancel).toBeDefined();
    expect(service.data.url).toEqual(Mock.url);
    expect(service.data.ctrl).toEqual(Mock.ctrl);
    expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1);
  });

  it('should show dialog with custom config', function () {
    service.show(Mock.data);
    expect(service.data.cancel).toBeDefined();
    expect(service.data.url).toEqual(Mock.data.url);
    expect(service.data.ctrl).toEqual(Mock.data.ctrl);
    expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1);
  });

  it('should show dialog with custom template', function () {
    Mock.data.ctrl = undefined;
    service.show(Mock.data);
    expect(service.data.cancel).toBeDefined();
    expect(service.data.url).toEqual(Mock.data.url);
    expect(service.data.ctrl).toEqual(Mock.ctrl);
    expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1);
  });

  it('should show dialog with custom controller', function () {
    Mock.data.url = undefined;
    service.show(Mock.data);
    expect(service.data.cancel).toBeDefined();
    expect(service.data.url).toEqual(Mock.url);
    expect(service.data.ctrl).toEqual(Mock.data.ctrl);
    expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1);
  });

  it('should cancel dialog', function () {
    Mock.data.buttons = [{},{action:()=>{}}];
    service.show(Mock.data);
    service.data.cancel();
    expect(Injections.$mdDialog.cancel).toHaveBeenCalledTimes(1);
  });


  function mockData() {
    Mock.url = 'app/shared/commons/dialog/component/dialog-template.html';
    Mock.ctrl = 'dialogController';
    Mock.data = {
      url: 'template.html',
      ctrl: 'OtherController'
    }
  }



});
