(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ValidationEditorWidgetFactory', ValidationEditorWidgetFactory);

    ValidationEditorWidgetFactory.$inject = [
        'ValidationOptionWidgetFactory',
        'AddValidationEventFactory',
        'OtusValidationWidgetFactory'
    ];

    function ValidationEditorWidgetFactory(ValidationOptionWidgetFactory, AddValidationEventFactory, OtusValidationWidgetFactory) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new ValidationEditorWidget(scope, element, ValidationOptionWidgetFactory, AddValidationEventFactory, OtusValidationWidgetFactory);
        }

        return self;

    }

    function ValidationEditorWidget(scope, element, ValidationOptionWidgetFactory, AddValidationEventFactory, OtusValidationWidgetFactory) {
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
            var append = OtusValidationWidgetFactory.lalaia(validator);
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
