(function() {

  angular
    .module('studio')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
    .constant('APP_STATE', {
      'HOME': 'home',
      'SURVEY_TEMPLATES': 'survey-templates',
      'EDITOR': 'editor',
      'PREVIEW': 'preview',
      'LOGIN': 'login'
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
            templateUrl: 'app/dashboard/survey-templates/survey-form-view-section.html',
            controller: 'SurveyFormDashboardController as surveyFormDashboard'
          },
          'template-menu@survey-templates': {
            templateUrl: 'app/dashboard/survey-templates/menu/md-fab.html'
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
                  SurveyEditorService.startEditorWithSurveyTemplate(surveyTemplate);
                }
              }
            }
          }
        }
      });

    /* Default state (route)
     * $locationProvider.html5Mode(true);
     */
    $urlRouterProvider.otherwise('/login');
  }

}());
