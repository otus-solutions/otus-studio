describe('dialogController', function() {

  var Mock = {};
  var Injections;
  var ctrl;

  beforeEach(function () {
    angular.mock.module('studio');

    mockData();

    angular.mock.module(function ($provide) {
      $provide.value('WorkspaceService',Mock.workspace);
      $provide.value('locals', Mock.node);
    });

    angular.mock.inject(function (_$injector_,_$controller_) {

      Injections ={
        $mdDialog: _$injector_.get('$mdDialog'),
        locals: _$injector_.get('locals'),
        $timeout: _$injector_.get('$timeout'),
        WorkspaceService: _$injector_.get('WorkspaceService')
      };

      ctrl = _$controller_('dialogController',Injections);

    });

    spyOn(ctrl, 'up').and.callThrough();
    spyOn(ctrl, 'down').and.callThrough();
    spyOn(ctrl, 'cancel').and.callThrough();
    spyOn(ctrl, 'confirm').and.callThrough();
    spyOn(ctrl, 'modificationClass').and.callThrough();

  });

  it('ctrlExistence check', function () {
    expect(ctrl).toBeDefined();
  });

  it('ctrlmethodExistence check', function () {
    expect(ctrl.up).toBeDefined();
    expect(ctrl.down).toBeDefined();
    expect(ctrl.cancel).toBeDefined();
    expect(ctrl.confirm).toBeDefined();
    expect(ctrl.modificationClass).toBeDefined();
  });

  it('up method should instantiate dialogController', function() {

    ctrl.up(Mock.node.node.outNeighbors[0].index);
    expect(ctrl.up).toHaveBeenCalledTimes(1);
  });

  it('down method should instantiate dialogController', function() {
    ctrl.down(Mock.node.node.outNeighbors[0].index);
    expect(ctrl.down).toHaveBeenCalledTimes(1);
  });

  it('cancel method should instantiate dialogController', function() {
    ctrl.cancel();
    expect(ctrl.cancel).toHaveBeenCalledTimes(1);
  });

  it('confirm method should instantiate dialogController', function() {
    ctrl.confirm();
    expect(ctrl.confirm).toHaveBeenCalledTimes(1);
  });

  it('modificationClass method should instantiate dialogController', function() {
    expect(ctrl.modificationClass(-Mock.node.node.outNeighbors[0].index)).toEqual('md-whiteframe-5dp');
    expect(ctrl.modificationClass).toHaveBeenCalledTimes(1);
  });


  function mockData() {
    Mock.routeItem = {
      origin :'FORM2',
      listRoutes : function () {
        return [Mock.route];
      },
      setRoutes : function () {
      }
    };

    Mock.itemList = [Mock.routeItem];
    Mock.survey = {};
    Mock.survey.NavigationManager = {};

    var spy = jasmine.createSpy('getNavigationList').and.returnValue(Mock.itemList);
    Mock.survey.NavigationManager.getNavigationList = spy;

    Mock.workspace = {
      getSurvey : function () {
        return Mock.survey;
      },
      saveWork : function () {
      }
    };

    Mock.route = {
      Route :{
        origin :'FORM2'
      }
    };

    Mock.node = {
      node: {
        id: 'FORM2',
        connectIn: function () { },
        outNeighbors: [
          {
            label: "TSTS7",
            index: 1
          }
        ],
        orderNavigationByPriorityInMap : function ( index, indexOld ) {
          return index;
        }
      }
    };
  }
});
