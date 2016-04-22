(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('editor.ui.mpath', mpath);

    function mpath() {
        var self = this;

        var MODULE = 'app/editor/ui/';
        var QUESTION_EDITOR_TEMPLATE = 'app/editor/ui/core/widget/question-editor/question-editor.html';
        var METADATA_TEMPLATE = 'app/editor/ui/core/widget/metadata/metadata-question-template.html';

        /* Public interface */
        self.getWidgetPath = getWidgetPath;
        self.getQuestionEditorWidgetPath = getQuestionEditorWidgetPath;
        self.getMetadataWidgetPath = getMetadataWidgetPath;

        function getWidgetPath(directive) {
            return MODULE.concat('core/widget/question/'.concat(directive).concat('/'.concat(directive.concat('-question-template.html'))));
        }

        function getQuestionEditorWidgetPath() {
            return QUESTION_EDITOR_TEMPLATE;
        }

        function getMetadataWidgetPath() {
            return METADATA_TEMPLATE;
        }
    }

}());
