(function() {
    'use strict';

    angular
        .module('preview')
        .controller('PreviewController', PreviewController);

    function PreviewController() {
        var self = this;

        self.getSurvey = getSurvey;

        function getSurvey() {
            return null;
        }
    }

}());
