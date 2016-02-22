(function() {

    angular
        .module('editor.engine.core')
        .factory('RemoveDataEventFactory', RemoveDataEventFactory);

    RemoveDataEventFactory.$inject = ['EditorEngineService'];

    function RemoveDataEventFactory(EditorEngineService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new RemoveDataEvent(prototype, EditorEngineService);
        }

        return self;
    }

    function RemoveDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.editData(prototype);
        }
    }

}());
