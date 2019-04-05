describe('RoutePriorityDialogService', function() {

  var Mock = {};
  var service = {};
  var ctrl;

  beforeEach(function () {
    angular.mock.module('studio');

    mockData();

    angular.mock.module(function ($provide) {
      $provide.value('$timeout', []);
      $provide.value('WorkspaceService',[]);

    });

    angular.mock.inject(function (_$injector_) {
      service = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService');
      Mock.mdDialog = _$injector_.get('$mdDialog')
    });

    spyOn(service, 'showDialog').and.callThrough();
    spyOn(Mock.mdDialog, 'show');
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
      service.showDialog(Mock.data);

      // expect(service.showDialog).toHaveBeenCalledTimes(1);


      //ctrl = Mock.mdDialog.show(Mock.node);

      // Mock.mdDialog.show();
      // var ctrl = Mock.mdDialog.show.calls.allArgs()[0][0].controller();
      // console.log(Mock.mdDialog.show.calls.allArgs()[0][0].controller)
      // console.log(ctrl)
    });

    it('should closeDialog method', function() {
      service.closeDialog();
      expect(service.closeDialog).toHaveBeenCalledTimes(1);
    });
  });

  function mockData() {
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
