(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

    SingleSelectionQuestionWidgetFactory.$inject = [
        'QuestionAnswerOptionEditorWidgetFactory',
        'AddAnswerOptionEventFactory',
        'RemoveAnswerOptionEventFactory',
    ];

    function SingleSelectionQuestionWidgetFactory(QuestionAnswerOptionEditorWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new SingleSelectionQuestionWidget(parentWidget, QuestionAnswerOptionEditorWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory);
        }

        return self;
    }

    function SingleSelectionQuestionWidget(parentWidget, QuestionAnswerOptionEditorWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};

        /* Template definitions */

        /* Template definitions */

        /* Instance definitions */
        self.parent = parentWidget;
        self.question = parentWidget.question;
        self.options = [];
        self.template = '<single-selection-question></single-selection-question>';

        /* Public methods */
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

        function addOption() {
            var newOption = AddAnswerOptionEventFactory.create().execute(self);
            var optionWidget = QuestionAnswerOptionEditorWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function removeLastOption() {
            RemoveAnswerOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());
