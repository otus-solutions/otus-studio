(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteNavigationWidgetFactory', RouteNavigationWidgetFactory);

    function RouteNavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new RouteNavigationWidget(model);
        }

        return self;
    }

    function RouteNavigationWidget(model) {
        var self = this;

        console.log(model);
        self.name = model.getName();
        self.destination = model.getDestination();
        self.nameTarget = 'survey.navigations[' + model.getIndex() + '].name';
        self.destinationTarget = 'survey.navigations[' + model.getIndex() + '].to';
    }

}());
