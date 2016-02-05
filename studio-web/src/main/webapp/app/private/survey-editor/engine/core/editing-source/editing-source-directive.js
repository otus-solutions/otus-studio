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
    Controller.$inject = ['$scope', '$element', '$attrs', 'EditingSourceService'];

    function Controller($scope, $element, $attrs, EditingSourceService) {

        var self = this,
            editingSource = null;

        /* Public interface */
        self.catchEditingSourceComponent = catchEditingSourceComponent;
        self.attachEventTriggers = attachEventTriggers;

        function catchEditingSourceComponent() {
            editingSource = EditingSourceService.createEditingSource($element, $attrs);

            /*========== DEV LOG ===========*/
            // console.info('Diretiva editing-source encontrada:');
            // console.log('ID: ' + editingSource.id);
            // console.log('Na tag: ' + editingSource.component.localName);
            // console.log('Tipo de evento: ' + editingSource.type);
            // console.log('Modelo alvo: ' + editingSource.target);
            /*==============================*/
        }

        function attachEventTriggers() {
            EditingSourceService.appendTriggersTo(editingSource);

            /*========== DEV LOG ===========*/
            console.info('Novo objecto EditingSource:');
            console.log(editingSource);
            /*==============================*/
        }

    }

}());
