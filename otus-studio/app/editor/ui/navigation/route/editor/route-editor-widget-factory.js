 (function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteEditorWidgetFactory', RouteEditorWidgetFactory);

    RouteEditorWidgetFactory.$inject = [
        '$mdDialog',
        'RemoveRouteEventFactory',
        'UpdateRouteEventFactory'
    ];

    function RouteEditorWidgetFactory($mdDialog, RemoveRouteEventFactory, UpdateRouteEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(route, parentWidget) {
            return new RouteEditorWidget(route, parentWidget, $mdDialog, RemoveRouteEventFactory, UpdateRouteEventFactory);
        }

        return self;
    }

    function RouteEditorWidget(route, parentWidget, $mdDialog, RemoveRouteEventFactory, UpdateRouteEventFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.css.ngClass = {};
        self.template = {};

        /* Template definitions */
        

        /* CSS definitions */
        self.css.ngClass.isSimpleRoute = route.isSimple || true;

        /* Instance definitions */
        self.parent = parentWidget;
        self.routeData = route;
        self.routeData.parentNavigation = parentWidget.navigation;

        /* Public methods */
        self.editRoute = editRoute;
        self.removeRoute = removeRoute;
        self.name = name;
        self.destination = destination;

        /* Actions */
        function editRoute() {
            self.dialogSettings = {
                parent: angular.element(document.body),
                templateUrl: 'app/editor/ui/navigation/route-condition/route-condition-dialog.html',
                openFrom: '#system-toolbar',
                controller: function controller() {
                    var vm = this;
                    vm.currentRoute = self.routeData;

                    vm.close = function close() {
                        $mdDialog.hide();
                    };
                },
                controllerAs: 'routeConditionDialog',
                clickOutsideToClose: true,
                fullscreen: true,
                closeTo: {
                    bottom: 0
                }
            };
            $mdDialog.show(self.dialogSettings);
        }

        function removeRoute() {
            RemoveRouteEventFactory.create().execute(self.routeData);
            self.parent.removeRoute(self.routeData.name);
        }

        /* Getters and setters */
        function name(value) {
            if (value !== undefined) {
                self.routeData.name = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.routeData.name;
        }

        function destination(value) {
            if (value !== undefined) {
                self.routeData.destination = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.routeData.destination;
        }

    }

}());
