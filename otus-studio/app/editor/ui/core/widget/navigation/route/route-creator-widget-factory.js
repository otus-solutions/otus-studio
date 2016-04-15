(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteCreatorWidgetFactory', RouteCreatorWidgetFactory);

    function RouteCreatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(navigation) {
            return new RouteCreatorWidget(navigation);
        }

        return self;
    }

    function RouteCreatorWidget(navigation) {

        var self = this;

        init();

        function init() {
            self.newName = 'survey.navigations[' + navigation.index + '].routes[' + navigation.listRoutes().length + '].name';
            self.newDestination = 'survey.navigations[' + navigation.index + '].routes[' + navigation.listRoutes().length + '].to';
        }
    }

}());
