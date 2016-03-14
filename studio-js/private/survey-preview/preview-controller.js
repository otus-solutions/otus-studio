(function() {
    'use strict';

    angular
        .module('editor.preview')
        .controller('PreviewController', PreviewController);

    PreviewController.$inject = ['StudioEditingService'];

    function PreviewController(StudioEditingService) {
        var self = this;

        self.getSurvey = getSurvey;

        function getSurvey() {
            return StudioEditingService.getCurrentSurvey();
        }
    }

}());
