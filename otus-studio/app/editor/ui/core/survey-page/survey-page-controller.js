(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SurveyPageController', SurveyPageController);

    SurveyPageController.$inject = [
        '$scope',
        '$element',
        'ModelBuilderHubService',
        'SurveyPageContentService',
        'WorkspaceService',
        'UIUpdateCommandFactory'
    ];

    function SurveyPageController($scope, $element, ModelBuilderHubService, SurveyPageContentService, WorkspaceService,
        UIUpdateCommandFactory) {

        var self = this;
        self.identifier = 'SurveyPageController';

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            // TODO: transformar essa implementação de observer para o 'modo angular' de tratar eventos
            ModelBuilderHubService.plugToLabelBuilder(self);
            ModelBuilderHubService.plugToQuestionBuilder(self);
            WorkspaceService.registerObserver(self);

            SurveyPageContentService.init($scope, $element);
        }

        function update(update) {
            var uiUpdateCommand = UIUpdateCommandFactory.create(update);
            uiUpdateCommand.execute();
        }
    }

}());
