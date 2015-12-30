(function() {

    var module = angular.module('StudioApp');

    module.controller('PreviewController', ['StudioEditingService', function(StudioEditingService) {
        var self = this;

        self.getSurvey = getSurvey;

        function getSurvey() {
            return StudioEditingService.getCurrentSurvey();
        }
    }]);

}());
