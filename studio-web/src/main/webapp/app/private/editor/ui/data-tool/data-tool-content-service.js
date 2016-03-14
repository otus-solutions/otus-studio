(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('DataToolContentService', DataToolContentService);

    DataToolContentService.$inject = [
        'WidgetService',
        'TemplateLoaderService'
    ];

    function DataToolContentService(WidgetService, TemplateLoaderService) {
        var self = this,
            scope = null,
            component = null;

        /* Public interface */
        self.init = init;
        self.showEditor = showEditor;
        self.hideEditor = hideEditor;
        self.loadQuestionDataEditor = loadQuestionDataEditor;

        function init(scopeReference, componentReference) {
            scope = scopeReference;
            component = componentReference;
            hideEditor();
        }

        function showEditor() {
            component.show();
        }

        function hideEditor() {
            component.hide();
        }

        function loadQuestionDataEditor(question) {
            scope.widget = WidgetService.getWidgetForModel(question);
            loadTemplate();
            component.children().remove();
            component.show();
        }

        function loadTemplate() {
            TemplateLoaderService.load('private/editor/ui/question-data-editor/question-data-editor.html', scope, function(template) {
                component.append(template);
            });
        }
    }

}());
