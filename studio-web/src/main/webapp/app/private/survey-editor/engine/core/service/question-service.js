(function() {

    angular
        .module('core')
        .service('QuestionService', QuestionService);

    var QuestionService = function() {

        var self = this;

        /* Public interface */
        self.setLabel = setLabel;
        self.setMetadataGroup = setMetadataGroup;
        self.enableComment = enableComment;

        function setLabel(value) {
            console.log('setLabel: ' + value);
        }

        function setMetadataGroup(value) {
            console.log('setMetadataGroup: ' + value);
        }

        function enableComment(value) {
            console.log('enableComment: ' + value);
        }

    };

}());
