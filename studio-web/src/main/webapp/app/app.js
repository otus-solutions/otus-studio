(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.main',
            'editor',
            'repository',
            'user',
            /* Otus platform modules */
            'otusjs',
            'ui.components',
            'utils'
        ]);

}());
