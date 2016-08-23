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

  describe('deactivate method', function() {

    beforeEach(function() {
      service.selectNode(Mock.n1);
      service.selectNode(Mock.n2);
    });

    xit('should reset origin and destination node references', function() {
      service.deactivate();

      expect(service.selectNode()[0]).toBe(null);
      expect(service.selectNode()[1]).toBe(null);
    });

  });

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
  }

});
