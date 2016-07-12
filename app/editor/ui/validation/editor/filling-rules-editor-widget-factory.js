(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FillingRulesEditorWidgetFactory', FillingRulesEditorWidgetFactory);

    FillingRulesEditorWidgetFactory.$inject = [
        'FillingRulesOptionWidgetFactory',
        'AddFillingRulesEventFactory',
        'OtusFillingRulesWidgetFactory',
        '$compile',
        'WorkspaceService'
    ];

    function FillingRulesEditorWidgetFactory(FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, WorkspaceService) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new FillingRulesEditorWidget(scope, element, FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, WorkspaceService);
        }

        return self;

    }

    function FillingRulesEditorWidget(scope, element, FillingRulesOptionWidgetFactory, AddFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, WorkspaceService) {
        var self = this;
        self.ngModel = scope.ngModel;
        self.options = [];

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.addValidator = addValidator;
        self.appendFillingRules = appendFillingRules;
        self.checkIfShow = checkIfShow;

        _init();

        function _init() {
            console.log(self.getItem());
            if (self.getItem().validate.options.length > 0) {
                _loadOptions();
            }
        }

        function getClassName() {
            return 'FillingRulesEditorWidget';
        }

        function getUUID() {
            return scope.uuid;
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
            self.getItem().validate.options.forEach(function(option) {
                var optionWidget = FillingRulesOptionWidgetFactory.create(option, self);
                self.options.push(optionWidget);
            });
        }

        function addValidator() {
            var newOption = AddFillingRulesEventFactory.create().execute(self);
            var optionWidget = FillingRulesOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function appendFillingRules(validator) {
          console.log(validator);
            var validatorObject = OtusFillingRulesWidgetFactory.create(validator, scope);
            addValidator();
            scope.addedValidatorWidget = validatorObject;

            console.log(validatorObject);
            var template = validatorObject.getTemplate();
            var validatorsColumn = element.find('#validators-column');

            var validatorTemplate = $compile(template)(scope);
            validatorsColumn.append(validatorTemplate);
            console.log(getItem());
        }

        //TODO
        function checkIfShow() {
            var options = {};
            var validators = getItem().validators();
            validators.forEach(function(item) {
                options[item] = true;
            });
            return options;
        }
    }

}());
