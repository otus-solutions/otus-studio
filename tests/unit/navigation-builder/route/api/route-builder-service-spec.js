describe('RouteBuilderService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_, $rootScope) {
      mockScope($rootScope, _$injector_);
      mockTemplateNavigations();
      mockNodes();
      mockDataService(_$injector_);
      mockEventsService(_$injector_);
      mockUiEventsService(_$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService', injections);
    });
  });

  describe('in service management methods', function() {

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

  describe('in map interactions methods', function() {

    describe('selectNode method', function() {

      it('should call DataService.selectNode', function() {
        service.selectNode(Mock.n1);

        expect(Mock.DataService.selectNode).toHaveBeenCalled();
      });

    });

    describe('selectedNode method', function() {

      it('should call DataService.selectedNode', function() {
        service.selectedNode();

        expect(Mock.DataService.selectedNode).toHaveBeenCalled();
      });

    });

    describe('selectedEdges method', function() {

      it('should call DataService.selectedEdges', function() {
        service.selectedEdges();

        expect(Mock.DataService.selectedEdges).toHaveBeenCalled();
      });

    });

  });

  describe('in route editor methods', function() {

    describe('startRouteBuilding method', function() {

      it('should call DataService.isSimpleNavigation', function() {
        spyOn(Mock.DataService, 'routeExists');
        spyOn(Mock.DataService, 'isSimpleNavigation');

        service.startRouteBuilding(Mock.n1, Mock.n2);

        expect(Mock.DataService.isSimpleNavigation).toHaveBeenCalled();
      });

      describe('when current navigation is simple', function() {

        beforeEach(function() {
          spyOn(Mock.DataService, 'isSimpleNavigation').and.returnValue(true);
        });

        it('should call DataService.initializeRouteData', function() {
          service.startRouteBuilding(Mock.n1, Mock.n2);

          expect(Mock.DataService.initializeRouteData).toHaveBeenCalled();
        });

        it('should call DataService.createCondition', function() {
          service.startRouteBuilding(Mock.n1, Mock.n2);

          expect(Mock.DataService.createCondition).toHaveBeenCalled();
        });

      });

      describe('when current navigation is not simple', function() {

        beforeEach(function() {
          spyOn(Mock.DataService, 'isSimpleNavigation').and.returnValue(false);
        });

        it('should call DataService.routeExists', function() {
          spyOn(Mock.DataService, 'routeExists');

          service.startRouteBuilding(Mock.n1.id, Mock.n2.id);

          expect(Mock.DataService.routeExists).toHaveBeenCalled();
        });

        describe('when route does not exists', function() {

          beforeEach(function() {
            spyOn(Mock.DataService, 'routeExists').and.returnValue(false);
          });

          it('should call DataService.initializeRouteData', function() {
            service.startRouteBuilding(Mock.n1, Mock.n2);

            expect(Mock.DataService.initializeRouteData).toHaveBeenCalled();
          });

          it('should call DataService.createCondition', function() {
            service.startRouteBuilding(Mock.n1, Mock.n2);

            expect(Mock.DataService.createCondition).toHaveBeenCalled();
          });

        });

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

  });

  describe('in rule editor methods', function() {

    beforeEach(function() {
      spyOn(Mock.DataService, 'isSimpleNavigation');
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
    Mock.DataService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.DataService');
    injections.DataService = Mock.DataService;
    spyOn(Mock.DataService, 'activate');
    spyOn(Mock.DataService, 'initializeRouteData');
    spyOn(Mock.DataService, 'createCondition');
    spyOn(Mock.DataService, 'selectCondition');
    spyOn(Mock.DataService, 'selectNode');
    spyOn(Mock.DataService, 'selectedNode').and.returnValue([Mock.n1, Mock.n2]);
    spyOn(Mock.DataService, 'selectedEdges');
    spyOn(Mock.DataService, 'deactivate');
    spyOn(Mock.DataService, 'listAvailableWhen').and.returnValue([]);
    spyOn(Mock.DataService, 'apply');
  }

  function mockEventsService($injector) {
    Mock.EventsService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.EventsService');
    injections.EventsService = Mock.EventsService;
    spyOn(Mock.EventsService, 'activate');
  }

  function mockUiEventsService($injector) {
    Mock.UiEventsService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.UiEventsService');
    injections.UiEventsService = Mock.UiEventsService;
    spyOn(Mock.UiEventsService, 'activate');
  }

});
