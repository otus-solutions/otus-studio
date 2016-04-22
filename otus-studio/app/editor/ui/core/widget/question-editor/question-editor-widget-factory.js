(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionEditorWidgetFactory', QuestionEditorWidgetFactory);

    function QuestionEditorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new QuestionEditorWidget();
        }

        return self;
    }

    function QuestionEditorWidget() {
        var self = this;

        self.header = '';
    }

}());
