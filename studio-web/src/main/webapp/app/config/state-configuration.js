(function() {

    var systemToolbarPath = 'private/main/home/ui/system-toolbar.html';

    var stateConfiguration = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'system-toolbar': {
                        templateUrl: systemToolbarPath
                    },
                    'system-content': {
                        templateUrl: 'private/main/home/ui/home.html'
                    }
                }
            })
            .state('container', {
                url: '/container',
                views: {
                    'system-toolbar': {
                        templateUrl: systemToolbarPath
                    },
                    'system-content': {
                        templateUrl: 'private/survey-editor/ui/container/container.html'
                    }
                }
            })
            .state('user-management', {
                url: '/user-management',
                views: {
                    'system-toolbar': {
                        templateUrl: systemToolbarPath
                    },
                    'system-content': {
                        templateUrl: 'private/user/management/users.html'
                    }
                }
            })
            .state('repository', {
                url: '/repository',
                views: {
                    'system-toolbar': {
                        templateUrl: systemToolbarPath
                    },
                    'system-content': {
                        templateUrl: 'private/survey-repository/repository.html'
                    }
                }
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/home');
    };

    angular
        .module('studio')
        .config(['$stateProvider', '$urlRouterProvider', stateConfiguration]);

}());
