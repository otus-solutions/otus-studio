(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('MetadataGroupController', MetadataGroupController);

    MetadataGroupController.$inject = [
        '$scope',
        '$element',
        'MetadataGroupContentService'
    ];

    function MetadataGroupController($scope, $element, MetadataGroupContentService) {
        var self = this;

        $scope.metadataAnswerOptions = [];
        MetadataGroupContentService.init($scope, $element);
    }

}());
