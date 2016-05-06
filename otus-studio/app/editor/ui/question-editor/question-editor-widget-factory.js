(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionEditorWidgetFactory', QuestionEditorWidgetFactory);

    function QuestionEditorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(question) {
            return new QuestionEditorWidget(question);
        }

        return self;
    }

    function QuestionEditorWidget(question) {
        var self = this;

        self.question = question;
    }

}());
