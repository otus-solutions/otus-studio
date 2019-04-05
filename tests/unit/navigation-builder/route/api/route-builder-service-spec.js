xdescribe('RouteBuilderService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    angular.mock.module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_, $rootScope) {
      mockScope($rootScope, _$injector_);
      mockTemplateNavigations();
      mockNodes();
      mockDataService(_$injector_);
      mockModuleEventsService(_$injector_);
      mockUiEventsService(_$injector_);

      service = _$injector_.get(
        'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService',
        injections);
    });
  });

  xdescribe('in service management methods', function() {

    describe('activate method', function() {

      beforeEach(function() {
        service.activate(Mock.scope);
      });

      it('should call DataService.activate', function() {
        expect(Mock.DataService.activate).toHaveBeenCalled();
      });

      it('should call EventsService.activate', function() {
        expect(Mock.EventsService.activate).toHaveBeenCalled();
      });

      it('should call UiEventsService.activate', function() {
        expect(Mock.UiEventsService.activate).toHaveBeenCalled();
      });

    });

    describe('deactivate method', function() {

      it('should call DataService.deactivate', function() {
        service.deactivate();

        expect(Mock.DataService.deactivate).toHaveBeenCalled();
      });

    });

  });

  xdescribe('in route editor methods', function() {

    describe('createCondition method', function() {

      it('should call DataService.createCondition', function() {
        service.createCondition();

        expect(Mock.DataService.createCondition).toHaveBeenCalled();
      });

    });

    describe('deleteCondition method', function() {

      it('should call DataService.deleteCondition', function() {
        service.deleteCondition();

        expect(Mock.DataService.deleteCondition).toHaveBeenCalled();
      });

    });

    describe('saveRouteBuilding method', function() {

      beforeEach(function() {
        service.saveRouteBuilding();
      });

      it('should call DataService.apply', function() {
        expect(Mock.DataService.apply).toHaveBeenCalled();
      });

    });

    describe('selectCondition method', function() {

      it('should call DataService.selectCondition', function() {
        service.selectCondition();

        expect(Mock.DataService.selectCondition).toHaveBeenCalled();
      });

    });

    describe('startRouteBuilding method', function() {

      it('should verify if route already exists', function() {
        spyOn(Mock.DataService, 'routeExists');

        service.startRouteBuilding(Mock.n1, Mock.n2);

        expect(Mock.DataService.routeExists).toHaveBeenCalled();
      });

      it('should always to select the first condition of route',
        function() {
          spyOn(Mock.DataService, 'routeExists');

          service.startRouteBuilding(Mock.n1, Mock.n2);

          expect(Mock.DataService.routeExists).toHaveBeenCalled();
        });

      describe('when exists', function() {

        beforeEach(function() {
          spyOn(Mock.DataService, 'routeExists').and.returnValue(
            true);
        });

        it('should use the current route data', function() {
          service.startRouteBuilding(Mock.n1, Mock.n2);

          expect(Mock.DataService.useCurrentRouteData).toHaveBeenCalled();
        });

      });

      describe('when does not exists', function() {

        beforeEach(function() {
          spyOn(Mock.DataService, 'routeExists').and.returnValue(
            false);
        });

        it('should initialize the route data', function() {
          service.startRouteBuilding(Mock.n1, Mock.n2);

          expect(Mock.DataService.initializeRouteData).toHaveBeenCalled();
        });

        it('should create a condition to route', function() {
          service.startRouteBuilding(Mock.n1, Mock.n2);

          expect(Mock.DataService.createCondition).toHaveBeenCalled();
        });

      });

    });

  });

  xdescribe('in rule editor methods', function() {

    beforeEach(function() {
      spyOn(Mock.DataService, 'isSimpleNavigation');
    });

    describe('createRule method', function() {

      it('should call DataService.createRule', function() {
        service.createRule();

        expect(Mock.DataService.createRule).toHaveBeenCalled();
      });

    });

    describe('deleteRule method', function() {

      it('should call DataService.deleteRule', function() {
        service.deleteRule();

        expect(Mock.DataService.deleteRule).toHaveBeenCalled();
      });

    });

    describe('getAnswerListForRule method', function() {

      beforeEach(function() {
        spyOn(Mock.DataService, 'routeExists');
        service.startRouteBuilding(Mock.n1, Mock.n2);
      });

      it('should call DataService.listAvailableAnswer', function() {
        service.getAnswerListForRule();

        expect(Mock.DataService.listAvailableAnswer).toHaveBeenCalled();
      });

      it('should return an array of operators', function() {
        var returnedValue = service.getAnswerListForRule();

        expect(returnedValue).toEqual(jasmine.any(Array));
      });

    });

    describe('getOperatorListForRule method', function() {

      beforeEach(function() {
        spyOn(Mock.DataService, 'routeExists');
        service.startRouteBuilding(Mock.n1, Mock.n2);
      });

      it('should call DataService.listAvailableOperator', function() {
        service.getOperatorListForRule();

        expect(Mock.DataService.listAvailableOperator).toHaveBeenCalled();
      });

      it('should return an array of operators', function() {
        var returnedValue = service.getOperatorListForRule();

        expect(returnedValue).toEqual(jasmine.any(Array));
      });

    });

    describe('getWhenListForRule method', function() {

      beforeEach(function() {
        spyOn(Mock.DataService, 'routeExists');
        service.startRouteBuilding(Mock.n1, Mock.n2);
      });

      it('should call DataService.listAvailableWhen', function() {
        service.getWhenListForRule();

        expect(Mock.DataService.listAvailableWhen).toHaveBeenCalled();
      });

      it('should return an array of SurveyItems', function() {
        var returnedValue = service.getWhenListForRule();

        expect(returnedValue).toEqual(jasmine.any(Array));
      });

    });

    describe('updateRule method', function() {

      it('should call DataService.updateRule', function() {
        service.updateRule();

        expect(Mock.DataService.updateRule).toHaveBeenCalled();
      });

    });

  });

  function mockScope($rootScope, $injector) {
    Mock.scope = $rootScope.$new();
    Mock.scope.events = $injector.get('NBEVENTS');
    Mock.scope.messages = $injector.get('NBMESSAGES');
  }

  function mockTemplateNavigations() {
    Mock.templateNavigations = [{
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD1",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD1",
        "destination": "CAD2",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD2",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD2",
        "destination": "CAD3",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD3",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD3",
        "destination": "CAD4",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD4",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD4",
        "destination": "CAD5",
        "conditionSet": {}
      }]
    }];
  }

  function mockNodes() {
    Mock.n1 = {
      id: 'N1',
      navigation: Mock.templateNavigations[0]
    };

    Mock.n2 = {
      id: 'N2',
      navigation: Mock.templateNavigations[1]
    };

    Mock.n3 = {
      id: 'N3',
      navigation: Mock.templateNavigations[2]
    };
  }

  function mockDataService($injector) {
    Mock.DataService = $injector.get(
      'otusjs.studio.navigationBuilder.routeBuilder.DataService');
    injections.DataService = Mock.DataService;
    spyOn(Mock.DataService, 'activate');
    spyOn(Mock.DataService, 'apply');
    spyOn(Mock.DataService, 'createCondition');
    spyOn(Mock.DataService, 'createRule');
    spyOn(Mock.DataService, 'deactivate');
    spyOn(Mock.DataService, 'deleteCondition');
    spyOn(Mock.DataService, 'deleteRule');
    spyOn(Mock.DataService, 'initializeRouteData');
    spyOn(Mock.DataService, 'selectCondition');
    spyOn(Mock.DataService, 'selectNode');
    spyOn(Mock.DataService, 'selectedEdges');
    spyOn(Mock.DataService, 'selectedNode').and.returnValue([Mock.n1, Mock.n2]);
    spyOn(Mock.DataService, 'useCurrentRouteData');
    spyOn(Mock.DataService, 'updateRule');
    spyOn(Mock.DataService, 'listAvailableAnswer').and.returnValue([]);
    spyOn(Mock.DataService, 'listAvailableOperator').and.returnValue([]);
    spyOn(Mock.DataService, 'listAvailableWhen').and.returnValue([]);
  }

  function mockModuleEventsService($injector) {
    Mock.EventsService = $injector.get(
      'otusjs.studio.navigationBuilder.routeBuilder.ModuleEventService');
    injections.EventsService = Mock.EventsService;
    spyOn(Mock.EventsService, 'activate');
    spyOn(Mock.EventsService, 'deactivate');
  }

  function mockUiEventsService($injector) {
    Mock.UiEventsService = $injector.get(
      'otusjs.studio.navigationBuilder.routeBuilder.UiEventsService');
    injections.UiEventsService = Mock.UiEventsService;
    spyOn(Mock.UiEventsService, 'activate');
    spyOn(Mock.UiEventsService, 'deactivate');
  }

});
