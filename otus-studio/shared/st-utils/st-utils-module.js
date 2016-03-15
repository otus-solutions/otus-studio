(function() {

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

    module.service('UUID', [function() {
        var self = this;

        self.generateUUID = generateUUID;

        function generateUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        }
    }]);

}());
