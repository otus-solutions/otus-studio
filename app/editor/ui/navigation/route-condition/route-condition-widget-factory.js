(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteConditionWidgetFactory', RouteConditionWidgetFactory);

    RouteConditionWidgetFactory.$inject = [
        'AddRouteConditionEventFactory'
    ];

    function RouteConditionWidgetFactory(AddRouteConditionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(route, parentWidget) {
            return new RouteConditionWidget(route, parentWidget, AddRouteConditionEventFactory);
        }

        return self;
    }

    function RouteConditionWidget(route, parentWidget, AddRouteConditionEventFactory) {
        var self = this;

        var GROUP_NAME_SUFIX = 'Grupo ';

        /* Type definitions */
        self.className = self.constructor.name;

        /* Instance definitions */
        self.parent = parentWidget;
        self.route = route;
        self.routeConditionName = '';
        self.routeConditions = [];

        /* Public methods */
        self.addRouteCondition = addRouteCondition;
        self.newRouteConditionName = newRouteConditionName;
        self.addRule = addRule;
        self.updateRuleList = updateRuleList;

        function newRouteConditionName(value) {
            if (value !== undefined) {
                self.routeConditionName = value;
            }

            return self.routeConditionName;
        }

        function addRouteCondition() {
            var routeCondition = AddRouteConditionEventFactory.create().execute(GROUP_NAME_SUFIX, self.route);
            var routeConditionWidget = {
                name: routeCondition.name,
                rules: []
            };
            self.routeConditions.push(routeConditionWidget);
        }

        function addRule(ruleWidget) {
            self.routeConditions[0].rules.push(ruleWidget);
        }

        function updateRuleList(widget) {
            var ruleToRemove = self.routeConditions[0].rules.filter(function(ruleWidget) {
                return ruleWidget.uuid === widget.uuid;
            });

            var indexToRemove = self.routeConditions[0].rules.indexOf(ruleToRemove[0]);
            if (indexToRemove > -1) self.routeConditions[0].rules.splice(indexToRemove, 1);
            return ruleToRemove[0];
        }
    }

}());
