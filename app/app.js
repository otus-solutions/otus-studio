(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.dashboard',
            'studio.authenticator',
            'editor',
            'otusjs',
            'preview',
            'surveyTemplates',
            /* Otus platform modules */
            'ui.components',
            'utils'
        ]);

}());
