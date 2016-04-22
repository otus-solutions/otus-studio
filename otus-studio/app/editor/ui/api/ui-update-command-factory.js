(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UIUpdateCommandFactory', UIUpdateCommandFactory);

    UIUpdateCommandFactory.$inject = [
        'SurveyPageContentService',
        'MainContainerContentService',
        'NavigationEditorContentService'
    ];

    function UIUpdateCommandFactory(SurveyPageContentService, MainContainerContentService, NavigationEditorContentService) {
        var self = this,

            updateCommandMap = {
                'NEW_PROJECT': [
                    SurveyPageContentService.reset
                ],
                'ADD_DATA': [
                    SurveyPageContentService.loadQuestion
                ],
                'REMOVE_DATA': {
                    'Question': [SurveyPageContentService.unloadQuestion],
                    'Route': [NavigationEditorContentService.unloadRoute]
                },
                'UPDATE_DATA': [
                    SurveyPageContentService.updateQuestion
                ],
                'SELECT_DATA': {
                    'Question': [
                        MainContainerContentService.showQuestionDataEditor
                    ]
                },
                'PRE_UPDATE_DATA': [
                    NavigationEditorContentService.loadRoute
                ]
            };

        /* Public interface */
        self.create = create;

        function create(update) {
            var updateCommands = null;

            if (update.dataModel)
                updateCommands = updateCommandMap[update.type][update.dataModel];
            else
                updateCommands = updateCommandMap[update.type];

            return new UIUpdate(updateCommands, update.data);
        }

        return self;
    }

    function UIUpdate(updateCommands, updateData) {
        var self = this;
        var commands = updateCommands;
        var data = updateData;

        /* Public interface */
        self.execute = execute;

        function execute() {
            commands.forEach(function executeCommand(command) {
                command(data);
            });
        }
    }

}());
