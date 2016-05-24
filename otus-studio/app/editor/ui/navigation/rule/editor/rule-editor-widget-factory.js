(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RuleEditorWidgetFactory', RuleEditorWidgetFactory);

    RuleEditorWidgetFactory.$inject = [
        'RemoveRuleEventFactory',
        'UUID'
    ];

    function RuleEditorWidgetFactory(RemoveRuleEventFactory, UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(rule, parentWidget) {
            return new RuleEditorWidget(rule, parentWidget, RemoveRuleEventFactory, UUID);
        }

        return self;
    }

    function RuleEditorWidget(rule, parentWidget, RemoveRuleEventFactory, UUID) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;

        /* Instance definitions */
        self.uuid = UUID.generateUUID();
        self.parent = parentWidget;
        self.route = parentWidget.route;
        self.rule = rule;
        self.newRuleGroup = {};
        self.ruleGroups = [];

        /* Public methods */
        self.when = when;
        self.operator = operator;
        self.answer = answer;
        self.removeRule = removeRule;

        function when(value) {
            if (value !== undefined) {
                self.rule.when = value;
            }

            return self.rule.when;
        }

        function operator(value) {
            if (value !== undefined) {
                self.rule.operator = value;
            }

            return self.rule.operator;
        }

        function answer(value) {
            if (value !== undefined) {
                self.rule.answer = value;
            }

            return self.rule.answer;
        }

        function removeRule() {
            RemoveRuleEventFactory.create().execute(self.rule, self.route);
            // self.route.conditionSet[0].removeRule(self.rule);
            self.parent.updateRuleList(self);
        }
    }

}());
