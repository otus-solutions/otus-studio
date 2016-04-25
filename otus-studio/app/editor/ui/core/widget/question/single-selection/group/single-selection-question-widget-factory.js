(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

    function SingleSelectionQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(question) {
            return new SingleSelectionQuestionWidget(question);
        }

        return self;
    }

    function SingleSelectionQuestionWidget(question) {
        var self = this;

        self.name = 'SingleSelectionQuestion';

        self.question = question;
        self.template = '<single-selection-question></single-selection-question>';
    }

}());
