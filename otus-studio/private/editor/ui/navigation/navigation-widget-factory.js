(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NavigationWidgetFactory', NavigationWidgetFactory);

    function NavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new NavigationWidget(model);
        }

        return self;
    }

    function NavigationWidget(model) {
        console.log(model);
        Object.defineProperty(this, 'model', {
            value: model,
            writable: false
        });

        Object.defineProperty(this, 'name', {
            value: model.name,
            writable: false
        });

        Object.defineProperty(this, 'origin', {
            value: model.origin,
            writable: false
        });

        Object.defineProperty(this, 'destination', {
            value: model.destination,
            writable: false
        });

        Object.defineProperty(this, 'conditionSet', {
            value: [],
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'newName', {
            value: 'survey.navigations[' + 0 + '].routes[' + 0 + '].name',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'newDestination', {
            value: 'survey.navigations[' + 0 + '].routes[' + 0 + '].to',
            writable: false,
            enumerable: true
        });
    }

}());
