(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionSettingsWidgetFactory', QuestionSettingsWidgetFactory);

    function QuestionSettingsWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new QuestionSettingsWidget(scope, element);
        }

        return self;
    }

    function QuestionSettingsWidget(scope, element) {
        var self = this;

        /* Type definitions */
        self.className = 'QuestionSettingsWidget';
        self.ngClass = {};

        /* Instance defintions */
        self.scope = scope;
        self.element = element;
        self.uuid = scope.uuid;
        self.parent = scope.$parent.$parent.$parent.widget;
        self.question = self.parent.question;
        self.listeners = {};

        /* Template definitions */
        self.ngClass.open = false;
        self.showNavigationEditor = false;

        /* Public methods */
        self.navigationButton = navigationButton;

        function navigationButton() {
            self.ngClass.open = !self.ngClass.open;
            self.showNavigationEditor = !self.showNavigationEditor;
        }
    }

}());
