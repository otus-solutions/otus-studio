(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NumericQuestionWidgetFactory', NumericQuestionWidgetFactory);

    function NumericQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(widget) {
            return new NumericQuestionWidget(widget);
        }

        return self;
    }

    function NumericQuestionWidget(widget) {
        var self = this;

        console.log(widget);

        self.widget = widget;
        self.template = '<numeric-question></numeric-question>';
    }

}());
