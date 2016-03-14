(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('editor.ui.mpath', mpath);

    function mpath() {
        var MODULE = 'private/editor/ui/';
        var QUESTION_EDITOR_TEMPLATE = 'private/editor/ui/core/widget/question-editor/question-editor-template.html';

        var self = this;

        /* Public interface */
        self.getWidgetPath = getWidgetPath;
        self.getQuestionEditorWidgetPath = getQuestionEditorWidgetPath;

        function getWidgetPath(directive) {
            return MODULE.concat('core/widget/question/'.concat(directive).concat('/'.concat(directive.concat('-question-template.html'))));
        }

        function getQuestionEditorWidgetPath() {
            return QUESTION_EDITOR_TEMPLATE;
        }
    }

}());
