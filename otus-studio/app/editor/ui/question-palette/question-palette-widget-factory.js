(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusQuestionPaletteWidgetFactory', OtusQuestionPaletteWidgetFactory);

    OtusQuestionPaletteWidgetFactory.$inject = [
        'AddQuestionEventFactory',
        'AddPageItemEventFactory'
    ];

    function OtusQuestionPaletteWidgetFactory(AddQuestionEventFactory, AddPageItemEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new OtusQuestionPaletteWidget(parentWidget, AddQuestionEventFactory, AddPageItemEventFactory);
        }

        return self;
    }

    function OtusQuestionPaletteWidget(parentWidget, AddQuestionEventFactory, AddPageItemEventFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;

        /* Instance definitions */
        self.parent = parentWidget;

        /* Public methods */
        self.addCalendarQuestion = addCalendarQuestion;
        self.addIntegerQuestion = addIntegerQuestion;
        self.addDecimalQuestion = addDecimalQuestion;
        self.addSingleSelectionQuestion = addSingleSelectionQuestion;
        self.addTextQuestion = addTextQuestion;
        self.addTimeQuestion = addTimeQuestion;
        self.addEmailQuestion = addEmailQuestion;
        self.addTextItem = addTextItem;
        self.addImageItem = addImageItem;
        self.addPhoneQuestion = addPhoneQuestion;

        /* Actions */
        function addCalendarQuestion() {
            AddQuestionEventFactory.create().execute('CalendarQuestion');
        }

        function addIntegerQuestion() {
            AddQuestionEventFactory.create().execute('IntegerQuestion');
        }

        function addDecimalQuestion() {
            AddQuestionEventFactory.create().execute('DecimalQuestion');
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

        function addEmailQuestion() {
            AddQuestionEventFactory.create().execute('EmailQuestion');
        }

        function addTextItem() {
            AddPageItemEventFactory.create().execute('TextItem');
        }

        function addImageItem() {
            AddPageItemEventFactory.create().execute('ImageItem');
        }

        function addPhoneQuestion() {
            AddQuestionEventFactory.create().execute('PhoneQuestion');
        }
    }

}());
