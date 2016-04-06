(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.dashboard',
            'editor',
            /* Otus platform modules */
            'otusjs',
            'ui.components',
            'utils'
        ])
        .run(function(DashboardStateService) {
            DashboardStateService.goToHome();
        });

}());
