(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

    SingleSelectionQuestionWidgetFactory.$inject = [
        'AnswerOptionWidgetFactory',
        'AddAnswerOptionEventFactory',
        'RemoveAnswerOptionEventFactory',
    ];

    function SingleSelectionQuestionWidgetFactory(AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new SingleSelectionQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory);
        }

        return self;
    }

    function SingleSelectionQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
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
            return 'SingleSelectionQuestionWidget';
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
            return '<otus-single-selection-question></otus-single-selection-question>';
        }

        function addOption() {
            var newOption = AddAnswerOptionEventFactory.create().execute(self);
            var optionWidget = AnswerOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function _loadAnswerOptions() {
            self.getItem().options.forEach(function(awswerOption) {
                var optionWidget = AnswerOptionWidgetFactory.create(awswerOption, self);
                self.options.push(optionWidget);
            });
        }

        function removeLastOption() {
            RemoveAnswerOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());
