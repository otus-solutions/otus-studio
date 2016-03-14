(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('MainContainerContentService', MainContainerContentService);

    MainContainerContentService.$inject = ['DataToolContentService'];

    function MainContainerContentService(DataToolContentService) {
        var self = this,
            controllerReference = null;

        /* Public interface */
        self.showQuestionDataEditor = showQuestionDataEditor;
        self.init = init;

        function init(cotroller) {
            controllerReference = cotroller;
        }

        function showQuestionDataEditor(data) {
            DataToolContentService.loadQuestionDataEditor(data);
        }
    }

}());
