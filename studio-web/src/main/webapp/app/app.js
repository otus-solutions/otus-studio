(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.dashboard',
            'editor',
            'repository',
            'user',
            /* Otus platform modules */
            'otusjs',
            'ui.components',
            'utils'
        ])
        .run(function(DashboardStateService) {
            DashboardStateService.goToHome();
        });

}());
