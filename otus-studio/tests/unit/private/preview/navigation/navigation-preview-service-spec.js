describe('NavigationPreviewService', function() {
    var Mock = {};
    var mockedGraph;

    var navigationObject=[{origin:"LAPA1",destinations:[{to:"LAPA2"},{to:"LAPA4"}]},{origin:"LAPA2",destinations:[{to:"LAPA3"}]},{origin:"LAPA3",destinations:[{to:"LAPA4"}]},{origin:"LAPA4",destinations:[{to:"LAPA5"}]},{origin:"LAPA5",destinations:[{to:"LAPA6"}]},{origin:"LAPA6",destinations:[{to:"LAPA7"}]},{origin:"LAPA7"}];

    /* @BeforeScenario */
    beforeEach(function() {
        module('preview');

        inject(function(_$injector_) {
            /* @InjectMocks */
            NavigationPreviewService = _$injector_.get('NavigationPreviewService', {
                'GraphFactory': mockGraphFactory(_$injector_)
            });
        });
    });

    describe('createGraph function should create a object graph with', function() {

        beforeEach(function() {
            // mock the Graph object
            mockedGraph = Mock.GraphFactory.create();
            spyOn(Mock.GraphFactory, "create").and.returnValue(mockedGraph);
            // call the service
            NavigationPreviewService.createGraph(navigationObject);
        });

        it('seven nodes', function() {
            expect(countNodes(mockedGraph)).toEqual(7);
        });

        it('seven edges', function() {
            expect(countEdges(mockedGraph)).toEqual(7);
        });

        it('the node LAPA1 must have contains egdes to LAPA2 and LAPA4', function() {
            expect(getEdges(mockedGraph, 'LAPA1')).toContain('LAPA2', 'LAPA4');
        });

        it('the node LAPA2 must have contains egdes to LAPA3', function() {
            expect(getEdges(mockedGraph, 'LAPA2')).toContain('LAPA3');
        });

        it('the node LAPA3 must have contains egdes to LAPA4', function() {
            expect(getEdges(mockedGraph, 'LAPA3')).toContain('LAPA4');
        });

        it('the node LAPA4 must have contains egdes to LAPA5', function() {
            expect(getEdges(mockedGraph, 'LAPA4')).toContain('LAPA5');
        });

        it('the node LAPA5 must have contains egdes to LAPA6', function() {
            expect(getEdges(mockedGraph, 'LAPA5')).toContain('LAPA6');
        });

        it('the node LAPA6 must have contains egdes to LAPA7', function() {
            expect(getEdges(mockedGraph, 'LAPA6')).toContain('LAPA7');
        });

        it('the node LAPA7 must have no egdes', function() {
            expect(getEdges(mockedGraph, 'LAPA7')).toEqual([]);
        });

    });

    function countNodes(graph) {
        return Object.keys(graph.nodes).length;
    }

    function countEdges(graph) {
        return graph.edges.length;
    }

    //retorna todas as ligações do nodo(vértice)
    function getEdges(graph, node) {
        var edges = [];
        Object.keys(graph.nodes).forEach(function(element) {
            var nodeInNodes = graph.nodes[element];
            if (node === nodeInNodes.id) {
                for (var edge in nodeInNodes.edges) {
                    if (nodeInNodes.edges[edge].target.id != node) {
                        edges.push(nodeInNodes.edges[edge].target.id);
                    }
                }
            }
        });
        return edges;
    }

    function mockGraphFactory($injector) {
        Mock.GraphFactory = $injector.get('GraphFactory');
        return Mock.GraphFactory;
    }

});
