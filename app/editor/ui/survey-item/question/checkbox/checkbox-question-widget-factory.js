(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('CheckboxQuestionWidgetFactory', CheckboxQuestionWidgetFactory);

    CheckboxQuestionWidgetFactory.$inject = [
        'UpdateQuestionEventFactory',
        'otusjs.model.utils.AlphabetSuffixIDGenerator',
        'WorkspaceService'
    ];

    function CheckboxQuestionWidgetFactory(UpdateQuestionEventFactory, AlphabetSuffixIDGenerator, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new CheckboxQuestionWidget(scope, element, UpdateQuestionEventFactory, AlphabetSuffixIDGenerator, WorkspaceService);
        }

        return self;
    }

    function CheckboxQuestionWidget(scope, element, UpdateQuestionEventFactory, AlphabetSuffixIDGenerator, WorkspaceService) {
        var self = this;

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
            self.getItem().createOption(_generateOptionId());
            UpdateQuestionEventFactory.create().execute(self.getItem());
        }

        function _loadAnswerOptions() {
            var clonedArray = angular.copy(self.getItem().options);
            self.getItem().options = [];

            clonedArray.forEach(function(checkboxAnswerOption) {
                self.getItem().loadJsonOption(JSON.stringify(checkboxAnswerOption));
            });
        }

        function removeLastOption() {
            self.getItem().removeLastOption();
            UpdateQuestionEventFactory.create().execute(self.getItem());
        }

        function _generateOptionId() {
            var checkboxID;
            var quantity = self.getItem().options.length;
            do {
                checkboxID = self.getItem().customID + AlphabetSuffixIDGenerator.generateSuffixByOptionsLength(quantity++);
            } while (!WorkspaceService.getSurvey().isAvailableCustomID(checkboxID));
            return checkboxID;
        }

    }

}());
