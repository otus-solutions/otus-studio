(function() {
    'use strict';

    angular
        .module('preview.navigation')
        .service('NavigationPreviewService', NavigationPreviewService);

        NavigationPreviewService.$inject = ['GraphFactory'];

    function NavigationPreviewService(GraphFactory) {
        var self = this;

        // Public interface
        self.createGraph = createGraph;
        self.renderGraph = renderGraph;

        // Private Interface
        var navigationGraph,
        renderer,
        layouter;

        function createGraph(navigationRules) {
            init();
            iterate(navigationRules, drawNodes);
            iterate(navigationRules, drawEdges);
            draw();
            return navigationGraph;
        }

        function init() {
            navigationGraph = GraphFactory.create();
        }

        function iterate(navigationRules, drawOptions) {
            for (var navigationRule in navigationRules) {
                drawOptions(navigationRules[navigationRule]);
            }
        }

        function drawNodes(navigationRule) {
            if (navigationRule.hasOwnProperty('origin')) {
                navigationGraph.addNode(navigationRule.origin);
            }
        }

        function drawEdges(navigationRule) {
            if (navigationRule.hasOwnProperty('routes')) {
                for (var i = 0; i < navigationRule.routes.length; i++) {
                    navigationGraph.addEdge(navigationRule.origin, navigationRule.routes[i].destination, {
                        directed: true
                    });
                }
            }
        }

        function draw() {
            layouter = new Graph.Layout.Spring(navigationGraph);
            layouter.layout();
        }

        function renderGraph(createdGraph) {
           renderer = new Graph.Renderer.Raphael('survey-navigation-graph', createdGraph, $('#survey-navigation-graph').width(), $('#survey-navigation-graph').height());
           renderer.draw();
        }
    }

}());
