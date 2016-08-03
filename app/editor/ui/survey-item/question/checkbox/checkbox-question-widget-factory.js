(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('CheckboxQuestionWidgetFactory', CheckboxQuestionWidgetFactory);

    CheckboxQuestionWidgetFactory.$inject = [
        'AddAnswerOptionEventFactory',
        'RemoveAnswerOptionEventFactory',
    ];

    function CheckboxQuestionWidgetFactory(AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new CheckboxQuestionWidget(scope, element, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory);
        }

        return self;
    }

    function CheckboxQuestionWidget(scope, element, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        self.options = [];

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

        _init();

        function _init() {
            if (self.getItem().options.length > 0) {
                _loadAnswerOptions();
            }
        }

        function getClassName() {
            return 'CheckboxQuestionWidget';
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

        function getTemplate() {
            return '<checkbox-question></checkbox-question>';
        }

        function addOption() {
            var newOption = AddAnswerOptionEventFactory.create().execute(self);
            self.options.push(newOption);
        }

        function _loadAnswerOptions() {
            var clonedArray = angular.copy(self.getItem().options);
            self.getItem().options = [];

            clonedArray.forEach(function(checkboxAnswerOption) {
                var newOption = AddAnswerOptionEventFactory.create().execute(self);
                newOption.optionID = checkboxAnswerOption.optionID;
                newOption.customOptionID = checkboxAnswerOption.customOptionID;
                newOption.label = checkboxAnswerOption.label;
                self.options.push(newOption);
            });
        }

        function removeLastOption() {
            RemoveAnswerOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());
