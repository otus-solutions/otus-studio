(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RuleCreatorWidgetFactory', RuleCreatorWidgetFactory);

    RuleCreatorWidgetFactory.$inject = [
        'AddRuleEventFactory',
        'RuleEditorWidgetFactory',
        'WorkspaceService'
    ];

    function RuleCreatorWidgetFactory(AddRuleEventFactory, RuleEditorWidgetFactory, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, parentWidget) {
            return new RuleCreatorWidget(scope, parentWidget, AddRuleEventFactory, RuleEditorWidgetFactory, WorkspaceService);
        }

        return self;
    }

    function RuleCreatorWidget(scope, parentWidget, AddRuleEventFactory, RuleEditorWidgetFactory, WorkspaceService) {
        var self = this;

        /* Type definitions */
        self.name = 'RuleCreator';

        /* Instance definitions */
        self.newRule = {};
        self.parent = parentWidget;
        self.route = parentWidget.route;
        self.survey = WorkspaceService.getSurvey();

        /* User definitions */
        self.icon = 'low_priority';

        /* Public interface */
        self.avaiableQuestions = avaiableQuestions;
        self.when = when;
        self.operator = operator;
        self.answer = answer;
        self.saveRule = saveRule;

        /* View data interface */
        function avaiableQuestions() {
            return Object.keys(self.survey.questionContainer);
        }

        function when(value) {
            if (value !== undefined)
                self.newRule.when = value;

            return self.newRule.when;
        }

        function operator(value) {
            if (value !== undefined)
                self.newRule.operator = value;

            return self.newRule.operator;
        }

        function answer(value) {
            if (value !== undefined)
                self.newRule.answer = value;

            return self.newRule.answer;
        }

        function saveRule() {
            var newRule = AddRuleEventFactory.create().execute(self.newRule, self.route);
            var ruleEditorWidget = RuleEditorWidgetFactory.create(newRule, self.parent);
            self.parent.addRule(ruleEditorWidget);

            self.newRule = {};
        }

    }

}());
