(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .controller('SurveyPageController', SurveyPageController);

    SurveyPageController.$inject = [
        '$scope',
        '$element',
        'SurveyQuestionsUpdateService',
        'SurveyPageContentService',
        'LabelUpdateService',
        'WorkspaceService',
        'UIUpdateCommandFactory'
    ];

    function SurveyPageController($scope, $element, SurveyQuestionsUpdateService, SurveyPageContentService, LabelUpdateService, WorkspaceService,
        UIUpdateCommandFactory) {

        var self = this;

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            // TODO: transformar essa implementação de observer para o 'modo angular' de tratar eventos
            SurveyQuestionsUpdateService.registerObserver(self);
            LabelUpdateService.registerObserver(self);
            WorkspaceService.registerObserver(self);

            SurveyPageContentService.init($scope, $element);
        }

        function update(update) {
            var uiUpdateCommand = UIUpdateCommandFactory.create(update);
            uiUpdateCommand.execute();
        }
    }

}());
