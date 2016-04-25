(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SurveyPageController', SurveyPageController);

    SurveyPageController.$inject = [
        '$scope',
        '$element',
        'SurveyPageContentService',
        'WorkspaceService'
    ];

    function SurveyPageController($scope, $element, SurveyPageContentService, WorkspaceService) {
        var self = this;
        SurveyPageContentService.init($scope, $element);
        WorkspaceService.registerObserver(self);
    }

}());
