(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('BuildWorkFactory', BuildWorkFactory);

    function BuildWorkFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new BuildWork();
        }

        return self;
    }

    function BuildWork() {
        var self = this;

        self.survey = null;
        self.data = null;
        self.type = null;
        self.id = null;
        self.target = null;
        self.model = null;
    }

}());
