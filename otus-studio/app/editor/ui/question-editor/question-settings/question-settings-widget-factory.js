(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionSettingsWidgetFactory', QuestionSettingsWidgetFactory);

    function QuestionSettingsWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, element, parentWidget) {
            return new QuestionSettingsWidget(templateData, element, parentWidget);
        }

        return self;
    }

    function QuestionSettingsWidget(templateData, element, parentWidget) {
        var self = this;

        self.question = parentWidget.question;

        self.ngClass = {
            open: false
        };

        self.showNavigationEditor = false;

        self.navigationButton = navigationButton;

        function navigationButton() {
            self.ngClass.open = !self.ngClass.open;
            self.showNavigationEditor = !self.showNavigationEditor;
        }
    }

}());
