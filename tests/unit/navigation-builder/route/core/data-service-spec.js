describe('DataService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_, $rootScope) {
      mockSurvey();
      mockNodes();
      mockScope($rootScope, _$injector_);
      mockNavigationBuilderScopeService(_$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.DataService', injections);
    });

    service.activate(Mock.survey);
  });

  describe('in service management methods', function() {

    describe('deactivate method', function() {

      beforeEach(function() {
        service.selectNode(Mock.n1);
        service.selectNode(Mock.n2);
      });

      xit('should reset origin and destination node references', function() {
        service.deactivate();

        expect(service.selectNode()[0]).toBe(null);
        expect(service.selectNode()[1]).toBe(null);
        expect(service.currentRoute()).toBe(null);
      });

    });

  });

  describe('in map interactions methods', function() {

    describe('selectNode method', function() {

      beforeEach(function() {
        service.selectNode(Mock.n1);
      });

      describe('when origin node is not selected', function() {

        it('then should store a reference to selected node as the origin node', function() {
          expect(service.hasOriginNode()).toBe(true);
        });

        it('then should emit ORIGIN_NODE_SELECTED event', function() {
          var selectedNode = service.selectedNode()[0];

          expect(Mock.NavigationBuilderScopeService.emit).toHaveBeenCalledWith(Mock.scope.events.ORIGIN_NODE_SELECTED, selectedNode);
        });

      });

      describe('when origin node is selected', function() {

        describe('and the selected node is equal to origin node', function() {

          it('should unselect the origin node', function() {
            service.selectNode(Mock.n1);

            expect(service.hasOriginNode()).toBe(false);
          });

          it('should emit ORIGIN_NODE_UNSELECTED event', function() {
            service.selectNode(Mock.n1);

            expect(Mock.NavigationBuilderScopeService.emit).toHaveBeenCalledWith(Mock.scope.events.ORIGIN_NODE_UNSELECTED, Mock.n1);
          });

        });

        describe('and the selected node is not equal to origin node', function() {

          beforeEach(function() {
            service.selectNode(Mock.n2);
          });

          describe('and destination node is not selected', function() {

            it('then should store a reference to selected node as the destination node', function() {
              expect(service.hasDestinationNode()).toBe(true);
            });

            it('then should emit DESTINATION_NODE_SELECTED event', function() {
              expect(Mock.NavigationBuilderScopeService.emit).toHaveBeenCalledWith(Mock.scope.events.DESTINATION_NODE_SELECTED, service.selectedNode());
            });

          });

          describe('and destination node is selected', function() {

            describe('and the selected node is equal to destination node', function() {

              it('should unselect the origin node', function() {
                service.selectNode(Mock.n2);

                expect(service.hasDestinationNode()).toBe(false);
              });

              it('should emit DESTINATION_NODE_UNSELECTED event', function() {
                service.selectNode(Mock.n2);

                expect(Mock.NavigationBuilderScopeService.emit).toHaveBeenCalledWith(Mock.scope.events.DESTINATION_NODE_UNSELECTED, Mock.n2);
              });

            });

          });

        });

      });

    });

    describe('selectedNode method', function() {

      beforeEach(function() {
        service.selectNode(Mock.n1);
        service.selectNode(Mock.n2);
      });

      it('should return an array with origin and destination nodes', function() {
        var nodes = service.selectedNode();
        var n1 = nodes[0];
        var n2 = nodes[1];

        expect(n1.id).toEqual(Mock.n1.id);
        expect(n2.id).toEqual(Mock.n2.id);
      });

    });

    describe('hasOriginNode method', function() {

      it('should return true when origin node was selected', function() {
        service.selectNode(Mock.n1);

        expect(service.hasOriginNode()).toBeTruthy();
      });

      it('should return true when origin node was not selected', function() {
        expect(service.hasOriginNode()).toBeFalsy();
      });

    });

    describe('hasDestinationNode method', function() {

      it('should return true when origin node was selected', function() {
        service.selectNode(Mock.n1);
        service.selectNode(Mock.n2);

        expect(service.hasDestinationNode()).toBeTruthy();
      });

      it('should return true when origin node was not selected', function() {
        expect(service.hasDestinationNode()).toBeFalsy();
      });

    });

    describe('hasDestinationNode method', function() {

      it('should return true when origin node was selected', function() {
        service.selectNode(Mock.n1);
        service.selectNode(Mock.n2);

        expect(service.hasDestinationNode()).toBeTruthy();
      });

      it('should return true when origin node was not selected', function() {
        expect(service.hasDestinationNode()).toBeFalsy();
      });

    });

  });

  describe('in route editor methods', function() {

    beforeEach(function() {
      service.selectNode(Mock.n1);
      service.selectNode(Mock.n2);
    });

    describe('createCondition method', function() {

      beforeEach(function() {
        service.initializeRouteData();
      });

      it('should create a route condition data object', function() {
        service.createCondition();
        service.selectCondition(0);

        expect(service.selectedCondition()).toBeDefined();
      });

    });

    describe('initializeRouteData method', function() {

      beforeEach(function() {
        service.initializeRouteData();
      });

      it('should create a route data object', function() {
        service.initializeRouteData();

        expect(service.selectedRoute()).toBeDefined();
      });

    });

    describe('selectCondition method', function() {

      beforeEach(function() {
        service.initializeRouteData();
      });

      it('should set a reference to condition set identified by the index', function() {
        service.createCondition();
        service.selectCondition(0);

        expect(service.selectedCondition()).toBeDefined();
      });

    });

    describe('isSimpleNavigation method', function() {

      var routeList = [];

      beforeEach(function() {
        var listRoutes = jasmine.createSpy('listRoutes').and.returnValue(routeList);
        Mock.navigation.listRoutes = listRoutes;
      });

      it('should call survey.NavigationManager.selectNavigationByOrigin', function() {
        service.isSimpleNavigation(Mock.n1.id);

        expect(Mock.survey.NavigationManager.selectNavigationByOrigin).toHaveBeenCalled();
      });

      describe('when navigation of origin has only one route', function() {

        beforeEach(function() {
          routeList.push({});
        });

        it('should return true', function() {
          expect(service.isSimpleNavigation(Mock.n1.id)).toBeTruthy();
        });

      });

      describe('when navigation of origin has more than one route', function() {

        beforeEach(function() {
          routeList.push({});
          routeList.push({});
        });

        it('should return false', function() {
          expect(service.isSimpleNavigation(Mock.n1.id)).toBe(false);
        });

      });

    });

    describe('routeExists method', function() {

      beforeEach(function() {
        service.initializeRouteData();
      });

      it('should call hasRoute from selected navigation', function() {
        Mock.navigation.hasRoute = jasmine.createSpy('hasRoute');

        service.routeExists(Mock.n1, Mock.n2);

        expect(Mock.navigation.hasRoute).toHaveBeenCalled();
      });

    });

    describe('useCurrentRouteData method', function() {

      beforeEach(function() {
        Mock.route = {};
        Mock.route.toJson = jasmine.createSpy('toJson').and.returnValue('{}');
        Mock.navigation.getRoute = jasmine.createSpy('getRoute').and.returnValue(Mock.route);
      });

      it('should call getRoute method from navigation', function() {
        service.useCurrentRouteData(Mock.n1.id, Mock.n2.id);

        expect(Mock.navigation.getRoute).toHaveBeenCalled();
      });

      it('should call toJson method from route', function() {
        service.useCurrentRouteData(Mock.n1.id, Mock.n2.id);

        expect(Mock.route.toJson).toHaveBeenCalled();
      });

      it('should parse route json to object type', function() {
        spyOn(JSON, 'parse');

        service.useCurrentRouteData(Mock.n1.id, Mock.n2.id);

        expect(JSON.parse).toHaveBeenCalledWith(Mock.route.toJson());
      });

      it('should set the json parse result to current route data reference', function() {
        service.useCurrentRouteData(Mock.n1.id, Mock.n2.id);

        expect(service.selectedRoute()).not.toBe(null);
      });

    });

  });

  describe('in rule editor methods', function() {

    describe('listAvailableWhen method', function() {

      beforeEach(function() {
        service.selectNode(Mock.n2);
      });

      it('should call NavigationManagerService.getAvaiableRuleCriterionTargets', function() {
        service.listAvailableWhen();

        expect(Mock.survey.NavigationManager.getAvaiableRuleCriterionTargets).toHaveBeenCalled();
      });

      it('should return a list of available items to define a rule criterion', function() {
        var availableItems = service.listAvailableWhen();

        expect(availableItems).toEqual(jasmine.arrayContaining([Mock.n1]));
      });

    });

  });

  function mockScope($rootScope, $injector) {
    Mock.scope = $rootScope.$new();
    Mock.scope.events = $injector.get('NBEVENTS');
    Mock.scope.$emit = jasmine.createSpy('$emit');
  }

  function mockNodes() {
    Mock.n1 = {
      id: 'N1'
    };

    Mock.n2 = {
      id: 'N2'
    };

    Mock.n3 = {
      id: 'N3'
    };
  }

  function mockNavigationBuilderScopeService($injector) {
    Mock.NavigationBuilderScopeService = $injector.get('otusjs.studio.navigationBuilder.NavigationBuilderScopeService');
    injections.NavigationBuilderScopeService = Mock.NavigationBuilderScopeService;
    spyOn(Mock.NavigationBuilderScopeService, 'emit');
  }

  function mockSurvey() {
    Mock.survey = {};
    Mock.survey.NavigationManager = {};

    var spy = jasmine.createSpy('getAvaiableRuleCriterionTargets').and.returnValue([Mock.n1]);
    Mock.survey.NavigationManager.getAvaiableRuleCriterionTargets = spy;

    Mock.navigation = {};
    spy = jasmine.createSpy('selectNavigationByOrigin').and.returnValue(Mock.navigation);
    Mock.survey.NavigationManager.selectNavigationByOrigin = spy;
  }

});
