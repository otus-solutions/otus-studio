(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('UiBindingService', UiBindingService);

    function UiBindingService() {
        var self = this;

        /* Public interface */
        self.setScope = setScope;

        function setScope(scope) {
            scope.$on('otusWidgetPreLoad', function(event) {
                // console.log(event);
            });

            scope.$on('otusWidgetBinding', function(event) {
                // console.log(event.targetScope.widget.name);
            });
        }
    }

}());
