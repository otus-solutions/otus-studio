describe('DataService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_, $rootScope) {
      mockNodes();
      mockScope($rootScope, _$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.DataService', injections);
    });

    service.activate(Mock.scope);
  });

  describe('selectNode method', function() {

    describe('if origin node is not selected', function() {

      it('should store a reference to selected node as the origin node', function() {
        service.selectNode(Mock.n1);

        expect(service.hasOriginNode()).toBe(true);
      });

      it('should emit ORIGIN_NODE_SELECTED event', function() {
        service.selectNode(Mock.n1);
        var selectedNode = service.selectedNode()[0];

        expect(Mock.scope.$emit).toHaveBeenCalledWith(Mock.scope.events.ORIGIN_NODE_SELECTED, selectedNode);
      });

    });

    describe('if origin node is selected', function() {

      beforeEach(function() {
        service.selectNode(Mock.n1);
      })

      describe('and the selected node is equal to origin node', function() {

        it('should unselect the origin node', function() {
          service.selectNode(Mock.n1);

          expect(service.hasOriginNode()).toBe(false);
        });

      });

      it('should store a reference to selected node as the destination node', function() {
        service.selectNode(Mock.n2);

        expect(service.hasDestinationNode()).toBe(true);
      });

      it('should emit DESTINATION_NODE_SELECTED event', function() {
        service.selectNode(Mock.n2);

        expect(Mock.scope.$emit).toHaveBeenCalled();
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

});
