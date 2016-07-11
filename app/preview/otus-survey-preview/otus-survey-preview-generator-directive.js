(function() {
    'use strict';

    angular
        .module('preview')
        .directive('otusSurveyPreviewGenerator', otusSurveyPreviewGenerator);

    otusSurveyPreviewGenerator.$inject = ['$compile', 'WorkspaceService'];

    function otusSurveyPreviewGenerator($compile, WorkspaceService) {

        function linkFunc($scope, $element) {
            $element.on('click', function() {
                var newScope = $scope.$new(true);
                var otusSheet = $('otus-sheet');
                if(otusSheet) {
                    otusSheet.remove();
                }
                var surveyTemplateJson = WorkspaceService.getSurvey().toJson();
                var surveyTemplateObject = JSON.parse(surveyTemplateJson);
                newScope.surveyTemplate = surveyTemplateObject;
                var component = angular.element('<otus-sheet md-theme="layoutTheme" survey-template="surveyTemplate" layout="column" flex="80"></otus-sheet>');
                var content = $compile(component)(newScope);
                $('#survey-preview').append(content);
            });
        }

        var ddo = {
            restrict: 'A',
            link: linkFunc
        };

        return ddo;
    }

})();
