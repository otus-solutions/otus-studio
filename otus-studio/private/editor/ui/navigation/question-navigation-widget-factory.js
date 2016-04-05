(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionNavigationWidgetFactory', QuestionNavigationWidgetFactory);

    function QuestionNavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new QuestionNavigationWidget(model);
        }

        return self;
    }

    function QuestionNavigationWidget(model) {
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
    }

}());
