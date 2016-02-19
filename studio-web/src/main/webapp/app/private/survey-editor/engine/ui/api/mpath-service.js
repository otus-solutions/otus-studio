(function() {

    angular
        .module('editor.engine.ui')
        .service('editor.engine.ui.mpath', mpath);

    function mpath() {
        const MODULE = 'private/survey-editor/engine/ui/';

        var self = this;

        /* Public interface */
        self.getWidgetPath = getWidgetPath;

        function getWidgetPath(directive) {
            return MODULE.concat('widget/question/'.concat(directive).concat('/'.concat(directive.concat('-question-template.html'))));
        }
    }

}());
