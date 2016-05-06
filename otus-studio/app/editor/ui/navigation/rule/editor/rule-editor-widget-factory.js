(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RuleEditorWidgetFactory', RuleEditorWidgetFactory);

    RuleEditorWidgetFactory.$inject = [
        'UpdateRuleEventFactory'
    ];

    function RuleEditorWidgetFactory(UpdateRuleEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(rule, parentWidget) {
            return new RuleEditorWidget(rule, parentWidget, UpdateRuleEventFactory);
        }

        return self;
    }

    function RuleEditorWidget(rule, parentWidget, UpdateRuleEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'Rule';

        /* Instance definitions */
        self.parentWidget = parentWidget;

        /* View data */
        self.rule = rule;
        self.when = when;
        self.operator = operator;
        self.answer = answer;

        /* View data interface */
        function when(value) {
            if (value !== undefined) {
                self.rule.when = value;
                UpdateRuleEventFactory.create().execute(self);
            }

            return self.rule.when;
        }

        function operator(value) {
            if (value !== undefined) {
                self.rule.operator = value;
                UpdateRuleEventFactory.create().execute(self);
            }

            return self.rule.operator;
        }

        function answer(value) {
            if (value !== undefined) {
                self.rule.answer = value;
                UpdateRuleEventFactory.create().execute(self);
            }

            return self.rule.answer;
        }
    }

}());
