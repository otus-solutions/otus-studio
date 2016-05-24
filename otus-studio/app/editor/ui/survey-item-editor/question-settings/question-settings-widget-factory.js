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

        self.className = 'QuestionSettingsWidget';

        self.ngClass = {};
        /* Template definitions */
        self.ngClass.open = false;
        self.showNavigationEditor = false;

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.navigationButton = navigationButton;

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.$parent.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function navigationButton() {
            self.ngClass.open = !self.ngClass.open;
            self.showNavigationEditor = !self.showNavigationEditor;
        }
    }

}());
