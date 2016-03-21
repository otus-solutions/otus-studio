(function() {
    'use strict';

    var module = angular.module('utils', []);

    module.service('StringNormalizer', [function() {
        var self = this;

        self.normalizeString = normalizeString;

        function normalizeString(directiveName) {
            var tokenSeparator = (directiveName.indexOf('-') != -1) ? '-' : '.';

            var directiveParts = directiveName.split(tokenSeparator),
                loopSize = directiveParts.length,
                normalizedString = directiveParts[0].toLowerCase();

            for (var i = 1; i < loopSize; i++) {
                var firstLetter = directiveParts[i].slice(0, 1),
                    restOfString = directiveParts[i].slice(1);
                normalizedString = normalizedString.concat(firstLetter.toUpperCase().concat(restOfString.toLowerCase()));
            }
            return normalizedString;
        }
    }]);

    /**
    *
    *   UUID Generator Service
    *
    */
    module.service('UUID', UUID);

    function UUID() {

        var self = this;

        self.generateUUID = generateUUID;

        /**
         * node-uuid package
         * Generate a v1 (time-based) id
         */
        function generateUUID() {
            return uuid.v1();
        }
    }

    /**
    *
    *   Survey UUID Generator Service
    *
    */
    module.service('SurveyUUIDGenerator', SurveyUUIDGenerator);

    SurveyUUIDGenerator.$inject = ['$window', 'UUID'];

    function SurveyUUIDGenerator($window, UUID) {

        var userUUID = "userUUID:[" + $window.sessionStorage.userUUID + "]";
        var surveyUUID = "surveyUUID:[" + UUID.generateUUID() + "]";
        var repositoryUUID = "repositoryUUID:[ Not done yet ]";

        var self = this;

        self.generateSurveyUUID = generateSurveyUUID;

        function generateSurveyUUID() {
            return Base64.encode(userUUID + surveyUUID + repositoryUUID);
        }
    }

}());
