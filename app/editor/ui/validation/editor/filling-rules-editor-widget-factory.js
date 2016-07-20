(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FillingRulesEditorWidgetFactory', FillingRulesEditorWidgetFactory);

    FillingRulesEditorWidgetFactory.$inject = [
        'FillingRulesOptionWidgetFactory',
        'AddFillingRulesEventFactory',
        'RemoveFillingRulesEventFactory',
        'OtusFillingRulesWidgetFactory',
        '$compile',
        'UpdateSurveyItemEventFactory'
    ];

    function FillingRulesEditorWidgetFactory(FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateSurveyItemEventFactory) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new FillingRulesEditorWidget(scope, element, FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateSurveyItemEventFactory);
        }

        return self;

    }

    function FillingRulesEditorWidget(scope, element, FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateSurveyItemEventFactory) {
        var self = this;
        self.ngModel = scope.ngModel;
        self.options = [];

        /* Public methods */
        self.getClassName = getClassName;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.addValidator = addValidator;
        self.checkIfShow = checkIfShow;
        self.deleteValidator = deleteValidator;
        self.updateFillingRules = updateFillingRules;
        self.menuDisabler = menuDisabler;

        _init();

        function _init() {
            showList = showListFeeder();
            if (self.getItem().fillingRules.options !== {}) {
                _loadOptions();
            }
        }
        var showList;

        function showListFeeder() {
            var showList = getItem().validators();
            return showList;
        }

        function getClassName() {
            return 'FillingRulesEditorWidget';
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function _loadOptions() {
            Object.keys(self.getItem().fillingRules.options).forEach(function(validatorToLoad) {
                var validatorToLoadWidget = FillingRulesOptionWidgetFactory.create(validatorToLoad, self);
                self.options.push(validatorToLoadWidget);
                appendFillingRules(validatorToLoad);
            });
        }

        function addValidator(validator) {
            var newOption = AddFillingRulesEventFactory.create().execute(getItem(), validator);
            var optionWidget = FillingRulesOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
            appendFillingRules(validator);
        }

        function appendFillingRules(validator) {
            showList.splice(showList.indexOf(validator), 1);
            var template = OtusFillingRulesWidgetFactory.create(validator);
            var validatorsColumn = element.find('#validators-column');
            var validatorTemplate = $compile(template)(scope);
            validatorsColumn.append(validatorTemplate);
        }

        function deleteValidator(validator) {
            showList.push(validator);
            RemoveFillingRulesEventFactory.create().execute(self, validator);
            delete self.options[validator];
        }

        function updateFillingRules() {
            UpdateSurveyItemEventFactory.create().execute();
        }


        function checkIfShow(fillingRule) {
            if (showList.indexOf(fillingRule)>-1){
              return true;
            }
            else{
              return false;
            }
        }

        function menuDisabler() {
            if (showList.length > 1) {
                return false;
            } else {
                return true;
            }
        }

    }

}());
