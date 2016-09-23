(function() {
  'use strict';

  angular
    .module('preview')
    .directive('otusSurveyPreviewGenerator', otusSurveyPreviewGenerator);

  function otusSurveyPreviewGenerator() {
    var ddo = {
      restrict: 'A',
      controller: Controller
    };
    return ddo;
  }

  Controller.$inject = ['$scope', '$element', '$compile', 'WorkspaceService'];

  function Controller($scope, $element, $compile, WorkspaceService) {
    var OTUS_SHEET_COMPONENT = '<otus-sheet md-theme="layoutTheme" survey-template="surveyTemplate" layout="column" flex="80"></otus-sheet>';
    var _newScope;

    $element.on('click', function() {
      var otusSheetDOMElement = $('otus-sheet');

      if (otusSheetDOMElement[0]) {
        otusSheetDOMElement.remove();
        if (_newScope) {
          _newScope.$destroy();
        }
      }
      _generateOtusPreview();
    });

    function _generateOtusPreview() {
      _newScope = $scope.$new(true);
      _newScope.surveyTemplate = _getSurveyTemplateObject();
      var content = $compile(OTUS_SHEET_COMPONENT)(_newScope);
      $('#survey-preview').append(content);
    }

    function _getSurveyTemplateObject() {
      return JSON.parse(WorkspaceService.getSurvey().toJson());
    }
  }

})();
