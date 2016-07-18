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
        'WorkspaceService'
    ];

    function FillingRulesEditorWidgetFactory(FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, WorkspaceService) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new FillingRulesEditorWidget(scope, element, FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, WorkspaceService);
        }

        return self;

    }

    function FillingRulesEditorWidget(scope, element, FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, WorkspaceService) {
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

        _init();

        function _init() {
            showList = showListFeeder();
            console.log(Object.keys(self.getItem().fillingRules.options));
            if (self.getItem().fillingRules.options !== {}) {
                _loadOptions();
            }
        }
        var showList;

        function showListFeeder() {
            var showList = {};
            var validators = getItem().validators();
            validators.forEach(function(item) {
                showList[item] = true;
            });
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
          console.log(self.getItem().fillingRules.options);
            Object.keys(self.getItem().fillingRules.options).forEach(function(validatorToLoad) {
                var validatorToLoadWidget = FillingRulesOptionWidgetFactory.create(validatorToLoad, self);
                self.options.push(validatorToLoadWidget);
                appendFillingRules(validatorToLoad);
                console.log(validatorToLoad);
            });
        }

        function addValidator(validator) {
            var newOption = AddFillingRulesEventFactory.create().execute(getItem(), validator);
            var optionWidget = FillingRulesOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
            appendFillingRules(validator);
        }

        function appendFillingRules(validator) {
            showList[validator] = false;
            var template = OtusFillingRulesWidgetFactory.create(validator);
            // scope.addedValidatorWidget = validatorObject;
            // var template = validatorObject.getTemplate();
            var validatorsColumn = element.find('#validators-column');
            console.log(template);
            var validatorTemplate = $compile(template)(scope);
            validatorsColumn.append(validatorTemplate);
        }

        function deleteValidator(validator) {
            showList[validator] = true;
            RemoveFillingRulesEventFactory.create().execute(self, validator);
            delete self.options[validator];
        }


        function checkIfShow(fillingRule) {
            return showList;
        }

    }

}());
