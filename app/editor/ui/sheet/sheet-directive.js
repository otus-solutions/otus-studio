(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSheet', otusSheet);

    otusSheet.$inject = ['AddSurveyItemService', 'WorkspaceService', 'SheetContentService', '$stateParams', 'AddSurveyItemEventFactory', 'SurveyItemWidgetFactory'];

    function otusSheet(AddSurveyItemService, WorkspaceService, SheetContentService, $stateParams, AddSurveyItemEventFactory, SurveyItemWidgetFactory) {
        var ddo = {
            restrict: 'E',
            controller: 'SheetController',
            templateUrl: 'app/editor/ui/sheet/sheet.html',
            link: function linkFunc() {
/*                if ($stateParams.template) {
                    //load survey template

                    AddSurveyItemEventFactory.create().execute('CalendarQuestion');

                    AddSurveyItemEventFactory.create().execute('IntegerQuestion');

                }*/
            }
        };

        return ddo;
    }

}());
