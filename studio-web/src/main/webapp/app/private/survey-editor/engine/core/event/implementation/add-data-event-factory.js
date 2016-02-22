(function() {

    angular
        .module('editor.engine.core')
        .factory('AddDataEventFactory', AddDataEventFactory);

    AddDataEventFactory.$inject = ['EditorEngineService'];

    function AddDataEventFactory(EditorEngineService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new AddDataEvent(prototype, EditorEngineService);
        }

        return self;
    }

    function AddDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.editData(prototype);
        }
    }

}());
