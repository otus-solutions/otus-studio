(function() {

    angular
        .module('studio')
        .config(['$stateProvider', '$urlRouterProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'EDITOR': 'editor',
            'USER_MANAGEMENT': 'user-management',
            'CREATE_REPOSITORY': 'repository?actionType=NEW',
            'CONNECT_REPOSITORY': 'repository?actionType=CONNECT',
            'LOGOUT': '/studio/session/rest/authentication/logout'
        });

    function stateConfiguration($stateProvider, $urlRouterProvider) {

        var systemToolbarPath = 'private/main/system-toolbar/system-toolbar.html';

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'system-toolbar': {
                        templateUrl: systemToolbarPath
                    },
                    'system-content': {
                        templateUrl: 'private/main/home/home.html'
                    }
                }
            })
            .state('editor', {
                url: '/editor',
                views: {
                    'system-toolbar': {
                        templateUrl: systemToolbarPath
                    },
                    'system-content': {
                        templateUrl: 'private/survey-editor/ui/main-container/main-container.html'
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

    }

}());
