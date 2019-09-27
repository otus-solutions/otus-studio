(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveSurveyItemEventFactory', RemoveSurveyItemEventFactory);

    RemoveSurveyItemEventFactory.$inject = [
        '$rootScope',
        'WorkspaceService',
        'RemoveSurveyItemService',
      'SurveyItemGroupService'
    ];

    function RemoveSurveyItemEventFactory($rootScope, WorkspaceService, RemoveSurveyItemService, SurveyItemGroupService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveSurveyItemEvent($rootScope, WorkspaceService, RemoveSurveyItemService, SurveyItemGroupService);
        }

        return self;
    }

    function RemoveSurveyItemEvent($rootScope, WorkspaceService, RemoveSurveyItemService, SurveyItemGroupService) {
        var self = this;

        self.execute = execute;

        function execute(item) {
          let itemGroup = SurveyItemGroupService.getGroup(item.templateID);

          RemoveSurveyItemService.execute(item, WorkspaceService.getSurvey());
            $rootScope.$broadcast('item.remove', item, itemGroup);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
