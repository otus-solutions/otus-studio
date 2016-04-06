(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NavigationConditionWidgetFactory', NavigationConditionWidgetFactory);

    function NavigationConditionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new NavigationConditionWidget(model);
        }

        return self;
    }

    function NavigationConditionWidget(model) {
        Object.defineProperty(this, 'when', {
            value: model.when,
            writable: false
        });

        Object.defineProperty(this, 'answer', {
            value: model.answer,
            writable: false
        });
    }

}());
