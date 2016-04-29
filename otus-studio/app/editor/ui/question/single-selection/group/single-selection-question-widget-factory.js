(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

    function SingleSelectionQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new SingleSelectionQuestionWidget(parentWidget);
        }

        return self;
    }

    function SingleSelectionQuestionWidget(parentWidget) {
        var self = this;

        self.name = 'SingleSelectionQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.options = [];
        self.template = '<single-selection-question></single-selection-question>';

        self.removeLastOption = removeLastOption;

        function removeLastOption() {
            self.options.splice(-1);
        }
    }

}());
