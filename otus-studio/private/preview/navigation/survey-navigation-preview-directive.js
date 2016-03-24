(function() {
    'use strict';

    var navigationObject=[{origin:"LAPA1",destinations:[{to:"LAPA2"},{to:"LAPA4"}]},{origin:"LAPA2",destinations:[{to:"LAPA3"}]},{origin:"LAPA3",destinations:[{to:"LAPA4"}]},{origin:"LAPA4",destinations:[{to:"LAPA5"}]},{origin:"LAPA5",destinations:[{to:"LAPA6"}]},{},{origin:"LAPA6",destinations:[{to:"LAPA7"}]},{origin:"LAPA7"}];

    angular
        .module('preview.navigation')
        .directive('surveyNavigationPreviewGenerator', surveyNavigationPreviewGenerator);

    surveyNavigationPreviewGenerator.$inject = ['NavigationPreviewService'];

    function surveyNavigationPreviewGenerator(NavigationPreviewService) {

        function link(scope, element, attrs) {
            element.on('click', function(){
                if(element.find('svg')){
                    $('#survey-navigation-graph > svg:nth-child(1)').remove();
                }
                NavigationPreviewService.createGraph(navigationObject);
            });
        }

        var ddo =  {
            restrict : 'A',
            link : link
        };

        return ddo;
    }

}());
