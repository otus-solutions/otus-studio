(function() {

    angular
        .module('studio')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'SURVEY_FORMS': 'survey-forms',
            'EDITOR': 'editor',
            'LOGIN': 'login',
            'LOGOUT': 'http://' + window.location.hostname + '/otus-domain-rest/session/rest/authentication/logout'
        });

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        var dashboardMenu = 'app/dashboard/menu/dashboard-menu.html';

        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    'system-wrap' : {
                        templateUrl: 'app/authenticator/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'system-wrap' : {
                        templateUrl: 'app/dashboard/main-dashboard-content-template.html',
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@home': {
                        templateUrl: dashboardMenu,
                    },
                    'system-content@home': {
                        templateUrl: 'app/dashboard/template/dashboard-content-template.html'
                    },
                    'section-info@home': {
                        templateUrl: 'app/dashboard/home/home-info-section.html'
                    },
                    'section-view@home': {
                        templateUrl: 'app/dashboard/home/home-view-section.html'
                    },
                    'section-commands@home': {
                        templateUrl: 'app/dashboard/home/home-commands-section.html'
                    }
                }
            })
            .state('survey-forms', {
                url: '/survey-forms',
                views: {
                    'system-wrap' : {
                        templateUrl: 'app/dashboard/main-dashboard-content-template.html',
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@survey-forms': {
                        templateUrl: dashboardMenu
                    },
                    'system-content@survey-forms': {
                        templateUrl: 'app/dashboard/template/dashboard-content-template.html',
                        controller: 'SurveyFormDashboardController as surveyFormDashboard'
                    },
                    'section-info@survey-forms': {
                        templateUrl: 'app/dashboard/survey-form/survey-form-info-section.html'
                    },
                    'section-view@survey-forms': {
                        templateUrl: 'app/dashboard/survey-form/survey-form-view-section.html'
                    },
                    'section-commands@survey-forms': {
                        templateUrl: 'app/dashboard/survey-form/survey-form-commands-section.html'
                    }
                }
            })
            .state('editor', {
                url: '/editor',
                views: {
                    'system-wrap' : {
                        templateUrl: 'app/dashboard/main-dashboard-content-template.html',
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@editor': {
                        templateUrl: dashboardMenu
                    },
                    'system-content@editor': {
                        templateUrl: 'app/editor/ui/main/main-container.html',
                        controller: 'MainContainerController as mainContainer',
                        resolve: {
                            executor: function instantiateInDevEnvironment(SurveyEditorService) {
                                /**
                                 *
                                 * DO NOT REMOVE this comment. So use it at your own risk.
                                 *
                                 */
                                SurveyEditorService.startEditor({name: 'DEV Environment', acronym: 'DEV'});
                            }
                        }
                    }
                }
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode(true);
    }

}());
