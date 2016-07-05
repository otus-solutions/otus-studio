(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ValidationEditorWidgetFactory', ValidationEditorWidgetFactory);

    ValidationEditorWidgetFactory.$inject = [
        'ValidationOptionWidgetFactory',
        'AddValidationEventFactory',
        'OtusValidationWidgetFactory',
        '$compile'
    ];

    function ValidationEditorWidgetFactory(ValidationOptionWidgetFactory, AddValidationEventFactory, OtusValidationWidgetFactory, $compile) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new ValidationEditorWidget(scope, element, ValidationOptionWidgetFactory, AddValidationEventFactory, OtusValidationWidgetFactory, $compile);
        }

        return self;

    }

    function ValidationEditorWidget(scope, element, ValidationOptionWidgetFactory, AddValidationEventFactory, OtusValidationWidgetFactory, $compile) {
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
        self.appendValidation = appendValidation;
        self.checkIfShow = checkIfShow;

        _init();

        function _init() {
            console.log(self.getItem());
            if (self.getItem().validate.options.length > 0) {
              _loadOptions();
            }
        }

        function getClassName() {
            return 'ValidationEditorWidget';
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
                var optionWidget = ValidationOptionWidgetFactory.create(option, self);
                self.options.push(optionWidget);
            });
        }

        function addValidator() {
            var newOption = AddValidationEventFactory.create().execute(self);
            var optionWidget = ValidationOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function appendValidation(validator) {
            var template = OtusValidationWidgetFactory.validatorsTemplates(validator);
            console.log(template);
            var validatorsColumn = element.find('#validators-column');
            var validatorTemplate = $compile(template)(scope);
            console.log(validatorTemplate);
            validatorsColumn.append(validatorTemplate)
        }

        //TODO
        function checkIfShow(validation){
          var options={};
          var validators = getItem().validators();
          validators.forEach(function(item) {
            options[item]=true;
          });
          return options;
        }
    }

}());
