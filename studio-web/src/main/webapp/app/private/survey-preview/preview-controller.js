(function() {

    angular
        .module('editor.preview')
        .controller('PreviewController', ['StudioEditingService', PreviewController]);

    function PreviewController(StudioEditingService) {
        var self = this;

        self.getSurvey = getSurvey;

        function getSurvey() {
            return StudioEditingService.getCurrentSurvey();
        }
    }

}());
