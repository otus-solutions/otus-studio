(function() {

    angular
        .module('studio')
        .config(['$stateProvider', '$urlRouterProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'SURVEY_FORMS': 'survey-forms',
            'EDITOR': 'editor',
            'USER_MANAGEMENT': 'user-management',
            'CREATE_REPOSITORY': 'repository?actionType=NEW',
            'CONNECT_REPOSITORY': 'repository?actionType=CONNECT',
            'LOGOUT': '/otus-domain-rest/session/rest/authentication/logout'
        });

    function stateConfiguration($stateProvider, $urlRouterProvider) {

        var dashboardMenu = 'private/dashboard/menu/dashboard-menu.html';

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'dashboard-menu': {
                        templateUrl: dashboardMenu
                    },
                    'system-content': {
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
                    'dashboard-menu': {
                        templateUrl: dashboardMenu
                    },
                    'system-content': {
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
                    'dashboard-menu': {
                        templateUrl: dashboardMenu
                    },
                    'system-content': {
                        templateUrl: 'private/editor/ui/main/main-container.html',
                        controller: 'MainContainerController as mainContainer'
                    }
                }
            })
            .state('user-management', {
                url: '/user-management',
                views: {
                    'dashboard-menu': {
                        templateUrl: dashboardMenu
                    },
                    'system-content': {
                        templateUrl: 'shared/otus-domain/user/management/users.html'
                    }
                }
            })
            .state('repository', {
                url: '/repository',
                views: {
                    'dashboard-menu': {
                        templateUrl: dashboardMenu
                    },
                    'system-content': {
                        templateUrl: 'shared/otus-domain/survey-repository/repository.html'
                    }
                }
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/home');

    }

}());
