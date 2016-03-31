(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionNavigationExpressionWidgetFactory', QuestionNavigationExpressionWidgetFactory);

    function QuestionNavigationExpressionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new QuestionNavigationExpressionWidget(model);
        }

        return self;
    }

    function QuestionNavigationExpressionWidget(model) {
        Object.defineProperty(this, 'expression', {
            value: model, // TODO Aplicar Modelo Real
            writable: false
        });

        Object.defineProperty(this, 'value', {
            value: model, // TODO Aplicar Modelo Real
            writable: false
        });
    }

}());
