(function() {
    'use strict';

    angular
        .module('editor.model')
        .factory('EditingWorkService', EditingWorkService);

    function EditingWorkService() {
        var self = this;

        /* Public interface */
        self.startNewWork = startNewWork;
        self.loadWork = loadWork;

    }

}());
