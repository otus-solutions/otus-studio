(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRuleEventFactory', AddRuleEventFactory);

    AddRuleEventFactory.$inject = [
        'AddRuleService',
        'WorkspaceService',
        'RuleEditorWidgetFactory'
    ];

    function AddRuleEventFactory(AddRuleService, WorkspaceService, RuleEditorWidgetFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRuleEvent(AddRuleService, WorkspaceService, RuleEditorWidgetFactory);
        }

        return self;
    }

    function AddRuleEvent(AddRuleService, WorkspaceService, RuleEditorWidgetFactory) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var ruleCreatorWidget = eventSource.parentWidget;
            var rule = AddRuleService.execute(ruleCreatorWidget);

            var routeEditorWidget = ruleCreatorWidget.parentWidget;
            var ruleWidget = RuleEditorWidgetFactory.create(rule, routeEditorWidget);
            routeEditorWidget.addRule(ruleWidget);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
