(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.dashboard',
            'editor',
            'preview',
            /* Otus platform modules */
            'repository',
            'user',
            'otusjs',
            'ui.components',
            'utils'
        ])
        .run(function(DashboardStateService) {
            DashboardStateService.goToHome();
        });

}());
