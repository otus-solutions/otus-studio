(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('MetadataController', MetadataController);

    MetadataController.$inject = [
        '$scope',
        '$element',
        'MetadataAnswerOptionContentService'
    ];

    function MetadataController($scope, $element, MetadataAnswerOptionContentService) {
        var self = this;

        $scope.metadataAnswerOptions = [];
        MetadataAnswerOptionContentService.init($scope, $element);
    }

}());
