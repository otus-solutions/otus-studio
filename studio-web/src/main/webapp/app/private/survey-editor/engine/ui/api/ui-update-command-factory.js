(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('UIUpdateCommandFactory', UIUpdateCommandFactory);

    UIUpdateCommandFactory.$inject = ['SurveyPageContentService'];

    function UIUpdateCommandFactory(SurveyPageContentService) {
        var self = this,

            updateCommandMap = {
                'NEW_PROJECT': SurveyPageContentService.reset,
                'ADD_DATA': SurveyPageContentService.loadQuestion,
                'REMOVE_DATA': SurveyPageContentService.unloadQuestion,
                'UPDATE_DATA': SurveyPageContentService.updateQuestion
            };

        /* Public interface */
        self.create = create;

        function create(update) {
            var updateCommand = updateCommandMap[update.type];
            return new UIUpdate(updateCommand, update.data);
        }

        return self;
    }

    function UIUpdate(updateCommand, updateData) {
        var self = this,
            command = updateCommand,
            data = updateData;

        /* Public interface */
        self.execute = execute;

        function execute() {
            command(data);
        }
    }

}());
