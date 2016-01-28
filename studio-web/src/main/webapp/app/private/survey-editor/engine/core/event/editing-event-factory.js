(function() {

    angular
        .module('core')
        .factory('EditingEventFactory', [EditingEventFactory]);

    function EditingEventFactory() {
        return function EditingEvent() {
            this.type = null;
            this.target = null;
            this.modelType = null;
            this.oldState = null;
            this.newState = null;
        };
    }

}());
