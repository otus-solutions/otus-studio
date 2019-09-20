(function () {
  'use strict';

  angular
    .module('editor.ui')
    .factory('OtusSurveyItemPaletteWidgetFactory', OtusSurveyItemPaletteWidgetFactory);

  OtusSurveyItemPaletteWidgetFactory.$inject = [
    'AddSurveyItemEventFactory',
    '$mdDialog'
  ];

  function OtusSurveyItemPaletteWidgetFactory(AddSurveyItemEventFactory, $mdDialog) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(parentWidget) {
      return new OtusQuestionPaletteWidget(parentWidget, AddSurveyItemEventFactory, $mdDialog);
    }

    return self;
  }

  function OtusQuestionPaletteWidget(parentWidget, AddSurveyItemEventFactory, $mdDialog) {
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
    self.addGridIntegerQuestion = addGridIntegerQuestion;
    self.closeDialog = closeDialog;

    /* Actions */
    function addFileUploadQuestion() {
      AddSurveyItemEventFactory.create().execute('FileUploadQuestion');
      self.closeDialog();
    }

    function addAutocompleteQuestion() {
      AddSurveyItemEventFactory.create().execute('AutocompleteQuestion');
      self.closeDialog();
    }

    function addCalendarQuestion() {
      AddSurveyItemEventFactory.create().execute('CalendarQuestion');
      self.closeDialog();
    }

    function addIntegerQuestion() {
      AddSurveyItemEventFactory.create().execute('IntegerQuestion');
      self.closeDialog();
    }

    function addDecimalQuestion() {
      AddSurveyItemEventFactory.create().execute('DecimalQuestion');
      self.closeDialog();
    }

    function addSingleSelectionQuestion() {
      AddSurveyItemEventFactory.create().execute('SingleSelectionQuestion');
      self.closeDialog();
    }

    function addTextQuestion() {
      AddSurveyItemEventFactory.create().execute('TextQuestion');
      self.closeDialog();
    }

    function addTimeQuestion() {
      AddSurveyItemEventFactory.create().execute('TimeQuestion');
      self.closeDialog();
    }

    function addEmailQuestion() {
      AddSurveyItemEventFactory.create().execute('EmailQuestion');
      self.closeDialog();
    }

    function addTextItem() {
      AddSurveyItemEventFactory.create().execute('TextItem');
      self.closeDialog();
    }

    function addImageItem() {
      AddSurveyItemEventFactory.create().execute('ImageItem');
      self.closeDialog();
    }

    function addPhoneQuestion() {
      AddSurveyItemEventFactory.create().execute('PhoneQuestion');
      self.closeDialog();
    }

    function addCheckboxQuestion() {
      AddSurveyItemEventFactory.create().execute('CheckboxQuestion');
      self.closeDialog();
    }

    function addGridTextQuestion() {
      AddSurveyItemEventFactory.create().execute('GridTextQuestion');
      self.closeDialog();
    }

    function addGridIntegerQuestion() {
      AddSurveyItemEventFactory.create().execute('GridIntegerQuestion');
      self.closeDialog();
    }

    function closeDialog() {
      $mdDialog.hide();
    }

  }

}());
