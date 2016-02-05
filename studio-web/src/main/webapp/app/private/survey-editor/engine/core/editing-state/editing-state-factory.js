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
        var self = this;

        self.editingSource = editingSource;
        self.domData = DomParser.parse(editingSource);
    }

}());
