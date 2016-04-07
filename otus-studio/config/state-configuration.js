(function() {

    angular
        .module('studio')
        .config(['$stateProvider', '$urlRouterProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'SURVEY_FORMS': 'survey-forms',
            'EDITOR': 'editor',
            'LOGIN': 'login',
            'LOGOUT': '/otus-domain-rest/session/rest/authentication/logout'
        });

    function stateConfiguration($stateProvider, $urlRouterProvider) {

        var dashboardMenu = 'private/dashboard/menu/dashboard-menu.html';

        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    'system-wrap' : {
                        templateUrl: 'private/authenticator/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'system-wrap' : {
                        templateUrl: 'private/dashboard/dashboard-content.html',
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@home': {
                        templateUrl: dashboardMenu,
                    },
                    'system-content@home': {
                        templateUrl: 'private/dashboard/template/dashboard-content-template.html'
                    },
                    'section-info@home': {
                        templateUrl: 'private/dashboard/home/home-info-section.html'
                    },
                    'section-view@home': {
                        templateUrl: 'private/dashboard/home/home-view-section.html'
                    },
                    'section-commands@home': {
                        templateUrl: 'private/dashboard/home/home-commands-section.html'
                    }
                }
            })
            .state('survey-forms', {
                url: '/survey-forms',
                views: {
                    'system-wrap' : {
                        templateUrl: 'private/dashboard/dashboard-content.html',
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@survey-forms': {
                        templateUrl: dashboardMenu
                    },
                    'system-content@survey-forms': {
                        templateUrl: 'private/dashboard/template/dashboard-content-template.html',
                        controller: 'SurveyFormDashboardController as surveyFormDashboard'
                    },
                    'section-info@survey-forms': {
                        templateUrl: 'private/dashboard/survey-form/survey-form-info-section.html'
                    },
                    'section-view@survey-forms': {
                        templateUrl: 'private/dashboard/survey-form/survey-form-view-section.html'
                    },
                    'section-commands@survey-forms': {
                        templateUrl: 'private/dashboard/survey-form/survey-form-commands-section.html'
                    }
                }
            })
            .state('editor', {
                url: '/editor',
                views: {
                    'system-wrap' : {
                        templateUrl: 'private/dashboard/dashboard-content.html',
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@editor': {
                        templateUrl: dashboardMenu
                    },
                    'system-content@editor': {
                        templateUrl: 'private/editor/ui/main/main-container.html',
                        controller: 'MainContainerController as mainContainer'
                    }
                }
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/login');

    }

}());
