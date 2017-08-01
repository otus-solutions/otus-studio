(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusQuestionItem', {
      templateUrl: 'app/editor/ui/survey-item/question/question-template.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    'SurveyItemWidgetFactory',
  ];

  function Controller($scope, $element, SurveyItemWidgetFactory) {
    var self = this;
    let widgetFactories;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.getTemplate = getTemplate;


    function onInit() {
      widgetFactories = {
        'CalendarQuestion': '<calendar-question item="$ctrl.item"></calendar-question>',
        'IntegerQuestion': '<integer-question item="$ctrl.item"></integer-question>',
        'DecimalQuestion': '<decimal-question item="$ctrl.item"></decimal-question>',
        'SingleSelectionQuestion': '<single-selection-question item="$ctrl.item"></single-selection-question>',
        'CheckboxQuestion': '<checkbox-question item="$ctrl.item"></checkbox-question>',
        'TextQuestion': '<text-question item="$ctrl.item"></text-question>',
        'TimeQuestion': '<time-question item="$ctrl.item"></time-question>',
        'EmailQuestion': '<email-question item="$ctrl.item"></email-question>',
        'PhoneQuestion': '<phone-question item="$ctrl.item"></phone-question>',
        'AutocompleteQuestion': '<auto-complete-question item="$ctrl.item"></auto-complete-question>',
        'FileUploadQuestion': '<file-upload-question item="$ctrl.item"></file-upload-question>',
        'GridTextQuestion': '<grid-text-question item="$ctrl.item"></grid-text-question>',
        'TextItem': '<text-question item="$ctrl.item"></text-question>',
        'ImageItem': '<image-question item="$ctrl.item"></image-question>'
      };
    }

    function getTemplate() {
      return widgetFactories[self.item.objectType];
    }

  }

}());
