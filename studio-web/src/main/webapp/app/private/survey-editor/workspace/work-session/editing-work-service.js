(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('EditingWorkService', EditingWorkService);

    function EditingWorkService() {
        var self = this;

        /* Public interface */
        self.startNewWork = startNewWork;
        self.loadWork = loadWork;

    }

}());
