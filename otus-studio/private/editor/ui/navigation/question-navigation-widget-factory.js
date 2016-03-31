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
            value: model, // TODO Aplicar Modelo Real
            writable: false
        });

        Object.defineProperty(this, 'name', {
            value: model.name, // TODO Aplicar Modelo Real
            writable: false
        });

        Object.defineProperty(this, 'to', {
            value: model.to, // TODO Aplicar Modelo Real

            writable: false
        });

        Object.defineProperty(this, 'rules', {
            value: [],
            writable: false,
            enumerable: true
        });
    }

}());
