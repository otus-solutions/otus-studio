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
            component.children().remove();
            var questionWidget = WidgetService.getWidgetForModel(question);
            loadTemplate(questionWidget);
            component.show();
        }

        function loadTemplate(questionWidget) {
            TemplateLoaderService.load('private/editor/ui/question-data-editor/question-data-editor.html', scope, function(template) {
                scope.widget = questionWidget;
                component.append(template);
            });
        }
    }

}());
