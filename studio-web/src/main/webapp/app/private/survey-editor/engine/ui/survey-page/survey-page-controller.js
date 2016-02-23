(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .controller('SurveyPageController', SurveyPageController);

    SurveyPageController.$inject = [
        '$scope',
        '$element',
        'SurveyPageContentService',
        'SurveyQuestionsUpdateService',
        'LabelUpdateService',
        'WorkspaceService'
    ];

    function SurveyPageController($scope, $element, SurveyPageContentService, SurveyQuestionsUpdateService, LabelUpdateService, WorkspaceService) {
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

        function update(data, updateType) {
            if (updateType == 'NEW_PROJECT')
                SurveyPageContentService.reset(data);
            else if (updateType.isAddData())
                SurveyPageContentService.loadQuestion(data);
            else if (updateType.isRemoveData())
                SurveyPageContentService.unloadQuestion(data);
            else if (updateType.isUpdateData())
                SurveyPageContentService.updateQuestion(data);
        }
    }

}());
