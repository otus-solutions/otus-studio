(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('autocompleteQuestion', directive);

  function directive(AutocompleteQuestionWidgetFactory) {
    var ddo = {
      scope: {},
      templateUrl: 'app/editor/ui/survey-item/question/autocomplete/autocomplete-question.html',
      retrict: 'E',
      link: function(scope, element) {
        scope.widget = AutocompleteQuestionWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());
