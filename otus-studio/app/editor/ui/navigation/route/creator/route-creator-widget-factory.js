(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteCreatorWidgetFactory', RouteCreatorWidgetFactory);

    RouteCreatorWidgetFactory.$inject = ['UUID'];

    function RouteCreatorWidgetFactory(UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new RouteCreatorWidget(parentWidget, UUID);
        }

        return self;
    }

    function RouteCreatorWidget(parentWidget, UUID) {
        var self = this;

        self.name = 'RouteCreator';
        self.parentWidget = parentWidget;
        self.navigation = parentWidget.navigation;
        self.question = parentWidget.question;

        self.routeName = '';
        self.routeDestination = '';
    }

}());
