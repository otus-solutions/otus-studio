(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteEditorWidgetFactory', RouteEditorWidgetFactory);

    RouteEditorWidgetFactory.$inject = [
        'UpdateRouteEventFactory'
    ];

    function RouteEditorWidgetFactory(UpdateRouteEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(route, parentWidget) {
            return new RouteEditorWidget(route, parentWidget, UpdateRouteEventFactory);
        }

        return self;
    }

    function RouteEditorWidget(route, parentWidget, UpdateRouteEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'Route';

        /* Instance definitions */
        self.parentWidget = parentWidget;

        /* View data */
        self.route = route;
        self.name = name;
        self.destination = destination;
        self.ruleSet = [[]];

        self.ngClass = {
            open: false
        };

        self.addRule = addRule;
        self.removeRule = removeRule;
        self.editRouteButton = editRouteButton;

        function editRouteButton() {
            self.ngClass.open = !self.ngClass.open;
        }

        function addRule(rule) {
            self.ruleSet[0].push(rule);
        }

        function removeRule(name) {
            var ruleToRemove = self.ruleSet[0].filter(function(ruleEditor) {
                return ruleEditor.rule.name === name;
            });

            var indexToRemove = self.ruleSet[0].indexOf(ruleToRemove[0]);
            if (indexToRemove > -1) self.ruleSet[0].splice(indexToRemove, 1);
            return ruleToRemove[0];
        }

        /* View data interface */
        function name(value) {
            if (value !== undefined) {
                self.route.name = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.route.name;
        }

        function destination(value) {
            if (value !== undefined) {
                self.route.destination = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.route.destination;
        }
    }

}());
