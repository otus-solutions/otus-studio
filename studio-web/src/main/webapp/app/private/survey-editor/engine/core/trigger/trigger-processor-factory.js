(function() {

    angular
        .module('core')
        .factory('TriggerProcessorFactory', ['EditingEventFactory', 'EditingEventHandler', 'EditingStateFactory', TriggerProcessorFactory]);


    function TriggerProcessorFactory(EditingEventFactory, EditingEventHandler, EditingStateFactory) {
        return function TriggerProcessorFactory(target, eventType) {
            var type = eventType,
                event = new EditingEventFactory();

            this.storeOldState = function storeOldState(dataStructure) {
                this.data = EditingStateFactory.produce(dataStructure[0], target);
                event.oldState = this.data;
            };
            this.storeNewState = function storeNewState(dataStructure) {
                this.data = EditingStateFactory.produce(dataStructure[0], target);
                event.newState = this.data;
            };
            this.run = function run() {
                event.target = target;
                event.type = type;
                EditingEventHandler.handle(event);
                event = new EditingEventFactory();
            };
        };
    }

}());
