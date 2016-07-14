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
            if (self.getItem().fillingRules.options.length > 0) {
                _loadOptions();
            }
            showList = showListFeeder();
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
            self.getItem().fillingRules.options.forEach(function(option) {
                var optionWidget = FillingRulesOptionWidgetFactory.create(option, self);
                self.options.push(optionWidget);
            });
        }

        function addValidator(validator) {
            showList[validator] = false;
            var newOption = AddFillingRulesEventFactory.create().execute(getItem(), validator);
            var optionWidget = FillingRulesOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);

            var validatorObject = OtusFillingRulesWidgetFactory.create(validator, scope);
            scope.addedValidatorWidget = validatorObject;
            appendFillingRules(validatorObject);
        }

        function appendFillingRules(validatorObject) {
            var template = validatorObject.getTemplate();
            var validatorsColumn = element.find('#validators-column');

            var validatorTemplate = $compile(template)(scope);
            validatorsColumn.append(validatorTemplate);
        }

        function deleteValidator(validator) {
            //   showList[validator] = true;
            //TODO
            RemoveFillingRulesEventFactory.create().execute(self);
            self.options.splice(-1);
        }


        function checkIfShow(fillingRule) {
            return showList;
        }

    }

}());
