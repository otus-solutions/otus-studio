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

        Object.defineProperty(this, 'origin', {
            value: model.getOrigin(),
            writable: false
        });

        Object.defineProperty(this, 'conditionSet', {
            value: [],
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'newName', {
            value: 'survey.navigations[' + model.getIndex() + '].routes[' + model.listRoutes().length + '].name',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'newDestination', {
            value: 'survey.navigations[' + model.getIndex() + '].routes[' + model.listRoutes().length + '].to',
            writable: false,
            enumerable: true
        });
    }

}());
