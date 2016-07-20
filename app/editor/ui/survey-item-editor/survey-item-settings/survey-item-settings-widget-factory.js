(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SurveyItemSettingsWidgetFactory', SurveyItemSettingsWidgetFactory);

    function SurveyItemSettingsWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new SurveyItemSettingsWidget(scope, element);
        }

        return self;
    }

    function SurveyItemSettingsWidget(scope, element) {
        var self = this;

        self.className = 'SurveyItemSettingsWidget';

        self.ngClass = {};
        /* Template definitions */
        self.ngClass.open = false;
        self.showNavigationEditor = false;
        self.showValidationEditor = false;

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.navigationButton = navigationButton;
        self.validationButton = validationButton;

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

        function validationButton() {          
            self.ngClass.open = !self.ngClass.open;
            self.showValidationEditor = !self.showValidationEditor;
        }
    }

}());
