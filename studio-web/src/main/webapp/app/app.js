(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'repository',
            'editor',
            'main',
            'user',
            /* Otus platform modules */
            'otusjs',
            'ui.components',
            'utils'
        ]);

}());
