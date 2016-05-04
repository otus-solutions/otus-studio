(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('AddPageItemService', AddPageItemService);

    AddPageItemService.$inject = [
        'WorkspaceService',
        'PageItemFactory'
    ];

    function AddPageItemService(WorkspaceService, PageItemFactory) {
        var self = this;

        self.execute = execute;

        function execute(itemType) {
            var survey = WorkspaceService.getSurvey();
            var newItem = PageItemFactory.create(itemType, survey.identity.acronym + survey.questionsCount());
            survey.addQuestion(newItem);
            return newItem;
        }
    }

}());
