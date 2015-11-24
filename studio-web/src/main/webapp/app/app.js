angular
    .module('StudioApp', ['ui.router', 'ngMaterial', 'ui.mask', 'Home', 'User'])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            /**
             * The properties 'templateUrl' consider the url path from
             * /studio/app/, resulting on this request:
             *
             * /studio/app/<templateUrl_value>
             */
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'private/home/home.html'
                })
                .state('userManagement', {
                    url: '/userManagement',
                    templateUrl: 'private/user/management/users.html'
                });

            /* Default state (route) */
            $urlRouterProvider.otherwise('/home');
        }
    ]);
