angular
    .module('StudioApp', ['ui.router', 'ngMaterial','ngMessages', 'ui.mask', 'Home', 'User', 'Repository'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
        function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
            /**
             * The property 'templateUrl' will consider the url path
             * from of /studio/app/, resulting in this request:
             *
             * /studio/app/<templateUrl_value>
             */
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'private/home/home.html'
                })
                .state('user-management', {
                    url: '/user-management',
                    templateUrl: 'private/user/management/users.html'
                })
                .state('repository', {
                    url: '/repository',
                    templateUrl: 'private/repository/repository.html'
                });
            
            /* Configuration theme */
           /* $mdThemingProvider.theme('altTheme')
            .primaryPalette('purple');*/
            
            $mdThemingProvider.theme('custom1');
            
            $mdThemingProvider.theme('footerTheme');            

            /* Default state (route) */
            $urlRouterProvider.otherwise('/home');
            
        }
    ]);
