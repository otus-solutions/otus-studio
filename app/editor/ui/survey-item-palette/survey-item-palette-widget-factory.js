(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('OtusSurveyItemPaletteWidgetFactory', OtusSurveyItemPaletteWidgetFactory);

  OtusSurveyItemPaletteWidgetFactory.$inject = [
    'AddSurveyItemEventFactory',
  ];

  function OtusSurveyItemPaletteWidgetFactory(AddSurveyItemEventFactory) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(parentWidget) {
      return new OtusQuestionPaletteWidget(parentWidget, AddSurveyItemEventFactory);
    }

    return self;
  }

  function OtusQuestionPaletteWidget(parentWidget, AddSurveyItemEventFactory) {
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
    self.addCheckboxQuestion = addCheckboxQuestion;
    self.addAutocompleteQuestion = addAutocompleteQuestion;
    self.addFileUploadQuestion = addFileUploadQuestion;
    self.addGridTextQuestion = addGridTextQuestion;

    /* Actions */
    function addFileUploadQuestion() {
      AddSurveyItemEventFactory.create().execute('FileUploadQuestion');
    }

    function addAutocompleteQuestion() {
      AddSurveyItemEventFactory.create().execute('AutocompleteQuestion');
    }

    function addCalendarQuestion() {
      AddSurveyItemEventFactory.create().execute('CalendarQuestion');
    }

    function addIntegerQuestion() {
      AddSurveyItemEventFactory.create().execute('IntegerQuestion');
    }

    function addDecimalQuestion() {
      AddSurveyItemEventFactory.create().execute('DecimalQuestion');
    }

    function addSingleSelectionQuestion() {
      AddSurveyItemEventFactory.create().execute('SingleSelectionQuestion');
    }

    function addTextQuestion() {
      AddSurveyItemEventFactory.create().execute('TextQuestion');
    }

    function addTimeQuestion() {
      AddSurveyItemEventFactory.create().execute('TimeQuestion');
    }

    function addEmailQuestion() {
      AddSurveyItemEventFactory.create().execute('EmailQuestion');
    }

    function addTextItem() {
      AddSurveyItemEventFactory.create().execute('TextItem');
    }

    function addImageItem() {
      AddSurveyItemEventFactory.create().execute('ImageItem');
    }

    function addPhoneQuestion() {
      AddSurveyItemEventFactory.create().execute('PhoneQuestion');
    }

    function addCheckboxQuestion() {
      AddSurveyItemEventFactory.create().execute('CheckboxQuestion');
    }

    function addGridTextQuestion() {
      AddSurveyItemEventFactory.create().execute('GridTextQuestion');
    }

  }

}());
