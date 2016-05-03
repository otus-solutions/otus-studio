(function() {
    'use strict';

    var DOM_LOCATION_NAVEGATION_GRAPH = '#survey-navigation-graph > svg:nth-child(1)';

    angular
        .module('preview.navigation')
        .directive('surveyNavigationPreviewGenerator', surveyNavigationPreviewGenerator);

    surveyNavigationPreviewGenerator.$inject = [
        'NavigationPreviewService',
        'WorkspaceService'
    ];

    function surveyNavigationPreviewGenerator(NavigationPreviewService, WorkspaceService) {

        function link(scope, element, attrs) {
            element.on('click', function(){
                if(element.find(DOM_LOCATION_NAVEGATION_GRAPH)){
                    $(DOM_LOCATION_NAVEGATION_GRAPH).remove();
                }
                var navigationObject = WorkspaceService.getSurvey().navigationList;
                var createdGraph = NavigationPreviewService.createGraph(navigationObject);
                NavigationPreviewService.renderGraph(createdGraph);
            });
        }

        var ddo =  {
            restrict : 'A',
            link : link
        };

        return ddo;
    }

}());
