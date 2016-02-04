(function() {
    'use strict';

    angular
        .module('core')
        .directive('editingSource', directiveDefinition);

    /*
     * Directive initialization function
     */
    function directiveDefinition() {
        var ddo = {
            controller: Controller,
            link: linkImpl
        };

        return ddo;
    }

    /*
     * Link function implementation
     */
    function linkImpl(scope, element, attr, controller) {
        controller.catchEditingSourceComponent();
        controller.attachEventTriggers();
    }

    /*
     * Directive's controller implementation
     */
    Controller.$inject = ['$scope', '$element', '$attrs', 'EditingSourceFactory', 'EventTriggerFactory', 'EventTriggerTreeService'];

    function Controller($scope, $element, $attrs, EditingSourceFactory, EventTriggerFactory, EventTriggerTreeService) {

        var editingSource = null;

        this.catchEditingSourceComponent = function catchEditingSourceComponent() {
            editingSource = EditingSourceFactory.create($element, $attrs.esId, $attrs.esType, $attrs.esTarget);

            /*========== DEV LOG ===========*/
            // console.info('Diretiva editing-source encontrada:');
            // console.log('ID: ' + editingSource.id);
            // console.log('Na tag: ' + editingSource.component.localName);
            // console.log('Tipo de evento: ' + editingSource.type);
            // console.log('Modelo alvo: ' + editingSource.target);
            /*==============================*/
        };

        this.attachEventTriggers = function attachEventTriggers() {
            var eventTriggersToUse = EventTriggerFactory.produce(editingSource);
            editingSource.activeTriggers = eventTriggersToUse;
            console.log(editingSource);
        };

    }

}());
