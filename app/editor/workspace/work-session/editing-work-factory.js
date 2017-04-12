(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('EditingWorkFactory', EditingWorkFactory);

    function EditingWorkFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new EditingWork();
        }

        return self;
    }

    function EditingWork() {
        var self = this;

        self.survey = null;
        self.creationDateTime = null;
        self.author = null;
        self.contributors = null;
        self.isPublished = null;
        self.isSincronized = null;
        self.isLocallyPersisted = null;

    }

}());
