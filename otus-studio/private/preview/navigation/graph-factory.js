(function() {
    'use strict';

    angular
        .module('preview.navigation')
        .factory('GraphFactory', GraphFactory);

    /* Factory interface */
    function GraphFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new Graph();
        }

        return self;
    }

}());
