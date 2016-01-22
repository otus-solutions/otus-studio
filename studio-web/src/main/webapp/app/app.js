angular
    .module('StudioApp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ui.mask', 'Home', 'User', 'Repository', 'surveyEditing', 'editingEngine', 'Container', 'sheet', 'ui.components'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider',
        function($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
            /**
             * The property 'templateUrl' will consider the url path
             * from of /studio/app/, resulting in this request:
             *
             * /studio/app/<templateUrl_value>
             */
            $stateProvider
                .state('home', {
                    url: '/home',
                    views: {
                        'system-toolbar': {
                            templateUrl: 'private/studio/system-toolbar.html'
                        },
                        'system-content': {
                            templateUrl: 'private/home/home.html'
                        }
                    }
                })
                .state('container', {
                    url: '/container',
                    views: {
                        'system-toolbar': {
                            templateUrl: 'private/studio/system-toolbar.html'
                        },
                        'system-content': {
                            templateUrl: 'private/studio/edit/container/container.html'
                        }
                    }
                })
                .state('user-management', {
                    url: '/user-management',
                    views: {
                        'system-toolbar': {
                            templateUrl: 'private/studio/system-toolbar.html'
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
                            templateUrl: 'private/studio/system-toolbar.html'
                        },
                        'system-content': {
                            templateUrl: 'private/repository/repository.html'
                        }
                    }
                });

            /* Configuration theme */
            $mdThemingProvider.theme('layoutTheme');
            // $mdThemingProvider.theme('surveyEditorTheme');

            /*Configuration icons*/
            /* 24 is the size default of icons */
            $mdIconProvider.defaultIconSet('shared/img/icons/mdi.svg', 24);

            /* Default state (route) */
            $urlRouterProvider.otherwise('/home');

        }
    ]);
