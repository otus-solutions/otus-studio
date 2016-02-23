(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .service('editor.engine.ui.mpath', mpath);

    function mpath() {
        const MODULE = 'private/survey-editor/engine/ui/';
        const QUESTION_EDITOR_TEMPLATE = 'private/survey-editor/engine/ui/widget/question-editor/question-editor-template.html';

        var self = this;

        /* Public interface */
        self.getWidgetPath = getWidgetPath;
        self.getQuestionEditorWidgetPath = getQuestionEditorWidgetPath;

        function getWidgetPath(directive) {
            return MODULE.concat('widget/question/'.concat(directive).concat('/'.concat(directive.concat('-question-template.html'))));
        }

        function getQuestionEditorWidgetPath() {
            return QUESTION_EDITOR_TEMPLATE;
        }
    }

}());
