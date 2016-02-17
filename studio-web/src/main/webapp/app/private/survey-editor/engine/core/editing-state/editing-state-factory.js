(function() {

    angular
        .module('editor.engine.core')
        .factory('EditingStateFactory', EditingStateFactory);

    EditingStateFactory.$inject = ['DomParser'];

    function EditingStateFactory(DomParser) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(editingSource) {
            return new EditingState(editingSource, DomParser);
        }

        return self;
    }

    function EditingState(editingSource, DomParser) {
        this.domData = DomParser.parse(editingSource);
    }

}());
