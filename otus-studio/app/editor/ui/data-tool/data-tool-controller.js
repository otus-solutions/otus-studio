(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('DataToolController', DataToolController);

    DataToolController.$inject = [
        '$scope',
        '$element',
        'DataToolContentService'
    ];

    function DataToolController($scope, $element, DataToolContentService) {
        var self = this;

        /* Public interface */
        self.update = update;

        init();

        function init() {
            DataToolContentService.init($scope, $element);
        }

        function update(question) {
            self.selectedQuestion = question;
        }
    }

}());
