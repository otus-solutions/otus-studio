(function () {
  'use strict';

  angular
    .module('preview')
    .component('activityViewer', {
      controller: 'activityViewerCtrl',
      templateUrl: 'app/preview/activity-viewer-template.html'
    })
    .controller('activityViewerCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile',
    'WorkspaceService',
    'contextTemplate',
    'otusjs.model.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService'
  ];

  function Controller($scope, $element, $compile, WorkspaceService, contextTemplate, ActivityFacadeService, PlayerService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    var OTUS_SHEET_COMPONENT = '<otus-player md-theme="layoutTheme" layout="column" flex="100" layout-fill=""></otus-player>';
    var _newScope;
    var _user = undefined;
    var _participant = undefined;
    var _activityConfigurationName = "C0";
    self.template = contextTemplate;

    function _generateOtusPreview() {
      _newScope = $scope.$new(true);
      _newScope.surveyActivity = {};
      _newScope.surveyActivity.template = _getSurveyTemplateObject();
      var content = $compile(OTUS_SHEET_COMPONENT)(_newScope);
      $('#survey-preview').append(content);
    }

    function _getSurveyTemplateObject() {
      ActivityFacadeService.createActivity(self.template, _user, _participant,_activityConfigurationName);
    }

    function onInit() {
      var otusSheetDOMElement = $('otus-player');

      if (otusSheetDOMElement[0]) {
        otusSheetDOMElement.remove();
        if (_newScope) {
          _newScope.$destroy();
        }
      }
      _generateOtusPreview();
      PlayerService.setup();
    }
  }
}());
