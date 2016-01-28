(function() {

    var stateConfiguration = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'system-toolbar': {
                        templateUrl: 'private/main/home/ui/system-toolbar.html'
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
                        templateUrl: 'private/main/home/ui/system-toolbar.html'
                    },
                    'system-content': {
                        templateUrl: 'private/editor/ui/container/container.html'
                    }
                }
            })
            .state('user-management', {
                url: '/user-management',
                views: {
                    'system-toolbar': {
                        templateUrl: 'private/main/home/ui/system-toolbar.html'
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
                        templateUrl: 'private/main/home/ui/system-toolbar.html'
                    },
                    'system-content': {
                        templateUrl: 'private/repository/repository.html'
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
