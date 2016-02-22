(function() {

    angular
        .module('editor.engine.core')
        .factory('SetDataEventFactory', SetDataEventFactory);

    SetDataEventFactory.$inject = ['EditorEngineService'];

    function SetDataEventFactory(EditorEngineService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(prototype) {
            return new SetDataEvent(prototype, EditorEngineService);
        }

        return self;
    }

    function SetDataEvent(prototype, dispatcher) {
        var self = this;

        /* Public interface */
        self.forward = forward;

        function forward() {
            dispatcher.editData(prototype);
        }
    }

}());
