(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusQuestionPaletteWidgetFactory', OtusQuestionPaletteWidgetFactory);

    OtusQuestionPaletteWidgetFactory.$inject = [
        'AddQuestionEventFactory'
    ];

    function OtusQuestionPaletteWidgetFactory(AddQuestionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new OtusQuestionPaletteWidget(parentWidget, AddQuestionEventFactory);
        }

        return self;
    }

    function OtusQuestionPaletteWidget(parentWidget, AddQuestionEventFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;

        /* Instance definitions */
        self.parent = parentWidget;

        /* Public methods */
        self.addCalendarQuestion = addCalendarQuestion;
        self.addNumericQuestion = addNumericQuestion;
        self.addSingleSelectionQuestion = addSingleSelectionQuestion;
        self.addTextQuestion = addTextQuestion;
        self.addTimeQuestion = addTimeQuestion;

        /* Actions */
        function addCalendarQuestion() {
            AddQuestionEventFactory.create().execute('CalendarQuestion');
        }

        function addNumericQuestion() {
            AddQuestionEventFactory.create().execute('NumericQuestion');
        }

        function addSingleSelectionQuestion() {
            AddQuestionEventFactory.create().execute('SingleSelectionQuestion');
        }

        function addTextQuestion() {
            AddQuestionEventFactory.create().execute('TextQuestion');
        }

        function addTimeQuestion() {
            AddQuestionEventFactory.create().execute('TimeQuestion');
        }
    }

}());
