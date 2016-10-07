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

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile',
    'WorkspaceService',
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Controller($scope, $element, $compile, WorkspaceService, ActivityFacadeService) {
    var OTUS_SHEET_COMPONENT = '<otus-player md-theme="layoutTheme" layout="column" flex="80"></otus-player>';
    var _newScope;

    $element.on('click', function() {
      var otusSheetDOMElement = $('otus-player');

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
      _newScope.surveyActivity = {};
      _newScope.surveyActivity.template = _getSurveyTemplateObject();
      var content = $compile(OTUS_SHEET_COMPONENT)(_newScope);
      $('#survey-preview').append(content);
    }

    function _getSurveyTemplateObject() {
      return JSON.parse(WorkspaceService.getSurvey().toJson());
    }
  }

})();
