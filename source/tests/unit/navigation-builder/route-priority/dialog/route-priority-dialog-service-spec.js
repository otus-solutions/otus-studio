describe('RoutePriorityDialogService', function() {

  var Mock = {};
  var service = {};
  var Injections;

  beforeEach(function () {
    angular.mock.module('studio');

    mockData();

    angular.mock.module(function ($provide) {
      $provide.value('$mdDialog', Mock.mdDialog);
    });

    angular.mock.inject(function (_$injector_) {
      Injections ={
        $mdDialog: _$injector_.get('$mdDialog')
      };
      service = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService', Injections);
    });

    spyOn(service, 'showDialog').and.callThrough();
    spyOn(service, 'closeDialog').and.callThrough();
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  describe('serviceInstance', function() {

    it('showDialogMethodExistence check', function () {
      expect(service.showDialog).toBeDefined();
      expect(service.closeDialog).toBeDefined();
    });

    it('should showDialog method', function() {
      service.showDialog(Mock.node);

       expect(service.showDialog).toHaveBeenCalledTimes(1);

    });

    it('should closeDialog method', function() {
      service.closeDialog();
      expect(service.closeDialog).toHaveBeenCalledTimes(1);
    });
  });

  function mockData() {
    Mock.mdDialog = {
      show: function (dialog) {
        var self = this;
        self.test = dialog;
        return Promise.resolve(self);
      },
      hide: function () {}
    };

    Mock.node = {
          id: 'FORM2',
          connectIn: function () { },
          outNeighbors: [
            {
              label: "TSTS7",
              index: 1
            }
          ]
        }
  }

});
