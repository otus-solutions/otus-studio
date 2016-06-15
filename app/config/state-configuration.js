(function() {

    angular
        .module('studio')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'SURVEY_TEMPLATES': 'survey-templates',
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
                    'system-wrap': {
                        templateUrl: 'app/authenticator/login.html',
                        controller: 'LoginController as loginController'
                    }
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/dashboard/main-dashboard-content-template.html',
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@home': {
                        templateUrl: dashboardMenu,
                    },
                    'system-content@home': {
                        templateUrl: 'app/dashboard/home/layout-template.html'
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
            .state('survey-templates', {
                url: '/survey-templates',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/dashboard/main-dashboard-content-template.html',
                        controller: 'DashboardMenuController as dashboardMenu'
                    },
                    'dashboard-menu@survey-templates': {
                        templateUrl: dashboardMenu
                    },
                    'system-content@survey-templates': {
                        templateUrl: 'app/dashboard/survey-templates/layout-template.html',
                        controller: 'SurveyFormDashboardController as surveyFormDashboard'
                    },
                    'section-view@survey-templates': {
                        templateUrl: 'app/dashboard/survey-templates/survey-form-view-section.html'
                    },
                    'section-commands@survey-templates': {
                        templateUrl: 'app/dashboard/survey-templates/survey-form-commands-section.html'
                    }
                }
            })
            .state('editor', {
                url: '/editor',
                params: {
                    template: null
                },
                views: {
                    'system-wrap': {
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
                                //SurveyEditorService.startEditor({name: 'DEV Environment', acronym: 'DEV'});
                            },
                            editor: function load($stateParams, SurveyEditorService, CrossSessionDatabaseService, $window, $q) {
                                var surveyTemplate_OID = $window.sessionStorage.getItem('surveyTemplate_OID');

                                if ($stateParams.template) {
                                    _startEditor($stateParams.template);
                                } else if (surveyTemplate_OID) {
                                    var deferred = $q.defer();
                                    _loadFromIndexedDB();
                                    return deferred.promise;
                                }

                                function _loadFromIndexedDB() {
                                    var promise = CrossSessionDatabaseService.findSurveyTemplateByOID(surveyTemplate_OID);
                                    promise.then(function(result) {
                                        $stateParams.template = result.template;
                                        _startEditor($stateParams.template);
                                        deferred.resolve(true);
                                    });
                                }

                                function _startEditor(surveyTemplate) {
                                    SurveyEditorService.startEditorWithSurveyTemplate({
                                        name: surveyTemplate.identity.name,
                                        acronym: surveyTemplate.identity.acronym,
                                        oid: surveyTemplate.oid
                                    });
                                }
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
