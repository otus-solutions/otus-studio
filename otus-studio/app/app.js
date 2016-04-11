(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.dashboard',
            'studio.authenticator',
            'editor',
            /* Otus platform modules */
            'otusjs',
            'ui.components',
            'utils'
        ]);

}());
