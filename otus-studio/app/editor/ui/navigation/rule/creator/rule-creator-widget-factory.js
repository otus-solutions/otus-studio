(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RuleCreatorWidgetFactory', RuleCreatorWidgetFactory);

    RuleCreatorWidgetFactory.$inject = ['UUID'];

    function RuleCreatorWidgetFactory(UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, parentWidget) {
            return new RuleCreatorWidget(scope, parentWidget, UUID);
        }

        return self;
    }

    function RuleCreatorWidget(scope, parentWidget, UUID) {
        var self = this;

        /* Type definitions */
        self.name = 'RuleCreator';

        /* Instance definitions */
        self.newRule = {};
        self.parentWidget = parentWidget;
        self.route = parentWidget.route;
        self.question = parentWidget.question;

        /* User definitions */
        self.icon = 'low_priority';

        /* Public interface */
        self.when = when;
        self.operator = operator;
        self.answer = answer;

        /* View data interface */
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

    }

}());
