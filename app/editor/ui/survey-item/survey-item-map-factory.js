(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('SurveyItemMapFactory', SurveyItemMapFactory);

  function SurveyItemMapFactory(){

    var surveyItemMap =  {
      'CalendarQuestion': '<calendar-question item="$ctrl.item"></calendar-question>',
      'IntegerQuestion': '<integer-question item="$ctrl.item"></integer-question>',
      'DecimalQuestion': '<decimal-question item="$ctrl.item"></decimal-question>',
      'SingleSelectionQuestion': '<single-selection-question item="$ctrl.item"></single-selection-question>',
      'CheckboxQuestion': '<checkbox-question item="$ctrl.item"></checkbox-question>',
      'AutocompleteQuestion': '<autocomplete-question item="$ctrl.item"></autocomplete-question>',
      'FileUploadQuestion': '<file-upload-question item="$ctrl.item"></file-upload-question>',
      'GridTextQuestion': '<grid-text-question item="$ctrl.item"></grid-text-question>',

      'PhoneQuestion': '<phone-question></phone-question>',
      'EmailQuestion': '<email-question></email-question>',
      'TimeQuestion': '<time-question></time-question>',
      'TextQuestion': '<text-question></text-question>',

      'TextItem': '<text-item item="$ctrl.item"></text-item>',
      'ImageItem': '<image-item item="$ctrl.item"></image-item>'
    };

    return surveyItemMap;
  }

}());
