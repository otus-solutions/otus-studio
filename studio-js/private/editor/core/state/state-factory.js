(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('StateFactory', StateFactory);

    StateFactory.$inject = ['DomParser'];

    function StateFactory(DomParser) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(editingSource) {
            return new State(editingSource, DomParser);
        }

        return self;
    }

    function State(editingSource, DomParser) {
        this.domData = DomParser.parse(editingSource);
    }

}());
