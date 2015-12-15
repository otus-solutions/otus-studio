angular
    .module('StudioApp', ['ui.router', 'ngMaterial','ngMessages', 'ui.mask', 'Home', 'User', 'Repository'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider','$mdIconProvider',
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
            
            $mdThemingProvider.theme('default');
            
            $mdThemingProvider.theme('altTheme');
            
            
            /*Configuration icons*/
            /* 24 is the size default of icons */
            $mdIconProvider.defaultIconSet('shared/img/icons/mdi.svg', 24);


            /* Default state (route) */
            $urlRouterProvider.otherwise('/home');
        }
    ]);
