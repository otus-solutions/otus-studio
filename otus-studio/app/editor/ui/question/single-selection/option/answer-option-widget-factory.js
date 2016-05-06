(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionAnswerOptionEditorWidgetFactory', QuestionAnswerOptionEditorWidgetFactory);

    function QuestionAnswerOptionEditorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentWidget) {
            return new QuestionAnswerOptionEditorWidget(option, parentWidget);
        }

        return self;
    }

    function QuestionAnswerOptionEditorWidget(option, parentWidget) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};

        /* Template definitions */

        /* Template definitions */

        /* Instance definitions */
        self.parent = parentWidget;
        self.option = option;
    }

}());
