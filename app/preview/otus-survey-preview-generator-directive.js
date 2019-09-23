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
    '$window',
    'WorkspaceService',
    'otusjs.model.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, $element, $compile, $window, WorkspaceService, ActivityFacadeService, PlayerService) {
    var OTUS_SHEET_COMPONENT = '<otus-player md-theme="layoutTheme" layout="column" flex="80"></otus-player>';
    var _newScope;
    var _user = undefined;
    var _participant = undefined;
    var _activityConfigurationName = "C0";

    $element.on('click', function() {
      var otusSheetDOMElement = $('otus-player');

      if (otusSheetDOMElement[0]) {
        otusSheetDOMElement.remove();
        if (_newScope) {
          _newScope.$destroy();
        }
      }
      _generateOtusPreview();
      PlayerService.setup();
    });

    function _generateOtusPreview() {
      _newScope = $scope.$new(true);
      _newScope.surveyActivity = {};
      _newScope.surveyActivity.template = _getSurveyTemplateObject();
      var content = $compile(OTUS_SHEET_COMPONENT)(_newScope);
      // var _w = $window.open('', '_blank');
      // _w.document.write('<otus-viewer layout="column" flex></otus-viewer>');
      // angular.element(_w.document.body).append(content)
      // _w.document.write('<div id="survey-preview" layout="row" layout-align="center center" flex></div>');
      // $('#survey-preview').empty();
      $('#survey-preview').append(content);
    }

    function _getSurveyTemplateObject() {
      ActivityFacadeService.createActivity(WorkspaceService.getSurvey(), _user, _participant,_activityConfigurationName);
    }
  }

})();
