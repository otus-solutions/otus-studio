(function() {

    angular
        .module('studio', [
            /* External modules */
            'dependencies',
            /* Application modules */
            'studio.dashboard',
            'studio.authenticator',
            'editor',
            'otusjs',
            'preview',
            'otusjs.studio.navigationBuilder',
            'surveyTemplates',
            /* Otus platform modules */
            'ui.components',
            'utils',
            /* otusjs.player */
            'otusjs.player.core',
            'otusjs.player.component',
            'otus.validation'
        ]);

}());

(function() {
    'use strict';

    angular.module('studio.authenticator', []);

}());

(function() {
    'use strict';

    angular
        .module('studio.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'AuthenticationService'];

    function LoginController($scope, DashboardStateService, AuthenticationService) {
        var self = this;
        self.authenticate = authenticate;
        self.visitAccess = visitAccess;

        function authenticate(user) {
            AuthenticationService.login(user);
        }

        function visitAccess() {
            DashboardStateService.goToHome();
        }
    }

}());

(function() {

    angular.module('dependencies', [
        /* Angular modules */
        'ngMaterial',
        'ngMessages',
        'ngAnimate',
        /* 3rd-party modules */
        'ui.router',
        'lokijs',
        'indexedDB',
        'immutable',
        'ui.utils.masks',
        'otus.domain.client',
        'otus.textEdition'
    ]);

}());

(function() {

    angular
        .module('studio')
        .config(['$mdDateLocaleProvider', localeConfiguration]);

    function localeConfiguration($mdDateLocaleProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            if (Object.prototype.toString.call(date) !== '[object Date]') {
                return null;
            }
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + '/' + (monthIndex + 1) + '/' + year;
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
            date = new Date(dateString);
            if (Object.prototype.toString.call(date) !== '[object Date]') {
                return date;
            } else {
                newDateString = dateString.split('/');
                if (newDateString.length === 3) {
                  var day = newDateString[0];
                  var monthIndex = newDateString[1]-1;
                  var year = newDateString[2];
                    date = new Date(year, monthIndex, day);
                    return date;
                }
            }
        };
    }

}());

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

(function() {

    angular
        .module('studio')
        .config(['$mdThemingProvider', '$mdIconProvider', themeConfiguration]);

    function themeConfiguration($mdThemingProvider, $mdIconProvider) {

        $mdThemingProvider.theme('layoutTheme')
            .primaryPalette('blue', {
                'default': 'A200',
                'hue-1': '200',
                'hue-2': '50',
                'hue-3': '700'
            }).accentPalette('blue-grey', {
                'default': '900',
                'hue-1': '50'
            }).warnPalette('red')

        $mdThemingProvider.theme('greyTheme')
            .primaryPalette('grey');
        /*Configuration icons*/
        /* 24 is the size default of icons */
        $mdIconProvider.defaultIconSet('app/assets/img/icons/mdi.svg', 24);
    }

}());

(function() {
    'use strict';

    angular.module('studio.dashboard', []);

}());

(function() {
    'use strict';

    angular
        .module('editor', [
            'editor.core',
            'editor.database',
            'editor.ui',
            'editor.workspace'
        ]);

}());

(function() {
  'use strict';

  angular.module('otusjs.studio.navigationBuilder', [
      'otusjs.studio.navigationBuilder.routeBuilder',
      'otusjs.studio.navigationBuilder.navigationInspector',
      'otusjs.studio.navigationBuilder.messenger',
      'ngMaterial'
    ])
    .constant('NBEVENTS', {
      /* Module events */
      'NAVIGATION_BUILDER_ON': 'nbevents.navigation.builder.on',
      'NAVIGATION_UPDATED': 'nbevents.navigation.updated',
      'MAP_CONTAINER_READY': 'nbevents.map.container.ready',
      'RELOAD_MAP_DATA': 'nbevents.map.data.reload',
      /* Route events */
      'ROUTE_MODE_ON': 'nbevents.route.mode.on',
      'ROUTE_MODE_OFF': 'nbevents.route.mode.off',
      'ROUTE_DELETED': 'nbevents.route.deleted',
      'ROUTE_BUILD_STARTED': 'nbevents.route.started',
      'ROUTE_BUILD_SAVED': 'nbevents.route.build.saved',
      'ROUTE_BUILD_CANCELED': 'nbevents.route.build.canceled',
      /* Route Node events */
      'ORIGIN_NODE_SELECTED': 'nbevents.route.node.origin.selected',
      'ORIGIN_NODE_UNSELECTED': 'nbevents.route.node.origin.unselected',
      'DESTINATION_NODE_SELECTED': 'nbevents.route.node.destination.selected',
      'DESTINATION_NODE_UNSELECTED': 'nbevents.route.node.destination.unselected',
      /* Messenger events */
      'SHOW_MESSENGER': 'nbevents.messenger.show',
      'HIDE_MESSENGER': 'nbevents.messenger.hide',

      /* Navigation Inspector events */
      'INSPECTOR_MODE_ON': 'nbevents.inspector.mode.on',
      'NAVIGATION_SELECTED': 'nbevents.inspector.navigation.selected',

      /* Warning events */
      'ORPHANS_ENCOUNTERED': 'nbevents.warning.orphans.encountered'
    })
    .constant('NBMESSAGES', {
      'ROUTE_BUILDER': {
        'SELECT_ORIGIN': {
          header: 'Origem da Rota',
          content: 'Escolha o item que determinará o início da rota.'
        },
        'SELECT_DESTINATION': {
          header: 'Destino da Rota',
          content: 'Escolha o item que determinará o destino da rota.'
        }
      },
      'NAVIGATION_INSPECTOR': {
        'SELECT_NAVIGATION': {
          header: 'Inpecionar navegação',
          content: 'Escolha o item que você deseja inspecionar.'
        }
      }
    })
    .run([
      'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
      'otusjs.studio.navigationBuilder.NavigationBuilderService',
      '$rootScope',
      function(NavigationBuilderScopeService, NavigationBuilderService, $rootScope) {
        NavigationBuilderScopeService.initialize($rootScope.$new());

        NavigationBuilderScopeService.onEvent(NavigationBuilderScopeService.NBEVENTS.NAVIGATION_BUILDER_ON, function(event, survey) {
          NavigationBuilderService.setSurvey(survey);
          NavigationBuilderScopeService.emit(NavigationBuilderScopeService.NBEVENTS.MAP_CONTAINER_READY);
        });

        NavigationBuilderScopeService.onEvent(NavigationBuilderScopeService.NBEVENTS.RELOAD_MAP_DATA, function(event) {
          NavigationBuilderService.reloadMapData();
          NavigationBuilderScopeService.emit(NavigationBuilderScopeService.NBEVENTS.MAP_CONTAINER_READY);
        });
      }
    ]);
}());

(function() {
  'use strict';

  angular
    .module('preview')
    .controller('PreviewMenuController', Controller);

  Controller.$inject = [
    'DashboardStateService',
    'EditionPreviewService',
    'WorkspaceService',
    'SurveyEditorService',
    '$window'
  ];

  function Controller(DashboardStateService, EditionPreviewService, WorkspaceService, SurveyEditorService, $window) {
    var self = this;

    /* Public interface */
    self.backToEditor = backToEditor;

    function backToEditor() {
      if (EditionPreviewService.isLoadingMode()) {
        EditionPreviewService.setScope($scope);
        EditionPreviewService.loadSurveyTemplate().then(function(template) {
          SurveyEditorService.startEditorWithSurveyTemplate(template);
          EditionPreviewService.isLoading = false;
          WorkspaceService.getSurvey().NavigationManager.loadJsonData(template.navigationList);
          DashboardStateService.goToEditor();
        });
      } else {
        $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
      }

    }
  }
}());

(function() {
    'use strict';

    angular.module('preview', []);

}());

(function() {
    'use strict';

    angular
        .module('studio.authenticator')
        .service('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['LogoutDialogService',
        'DashboardStateService',
        'RestResourceService',
        '$mdToast',
        '$window'
    ];

    function AuthenticationService(LogoutDialogService, DashboardStateService, RestResourceService, $mdToast, $window) {
        var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
        var self = this;
        self.logout = logout;
        self.login = login;

        function logout() {
            LogoutDialogService.showDialog()
                .onConfirm(function() {
                    invalidateSession(RestResourceService);
                });
        }

        function invalidateSession(domainRestResourceService) {
            var authenticatorResource = domainRestResourceService.getAuthenticatorResource();

            if (!domainRestResourceService.isLogged()) {
                invalidateSessionVisitant();
            } else {
                invalidateSessionLoggedUser(authenticatorResource);
            }
        }

        function invalidateSessionLoggedUser(authenticatorResource) {
            authenticatorResource.invalidate(function(response) {
                DashboardStateService.logout();
                $window.sessionStorage.clear();
            });
        }

        function invalidateSessionVisitant() {
            $window.sessionStorage.clear();
            DashboardStateService.logout();
        }

        function login(user) {
            RestResourceService.setUrl(user.domain);
            var authenticatorResource = RestResourceService.getAuthenticatorResource();

            authenticatorResource.authenticate(user, function(response) {
                RestResourceService.setSecurityToken(response.data);

                if (!response.hasErrors) {
                    DashboardStateService.goToHome();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(LOGIN_ERROR_MESSAGE)
                    );
                }
            });
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$state',
        '$http',
        'APP_STATE'
    ];

    function DashboardStateService($state, $http, APP_STATE) {
        var self = this;

        /* Public interface */
        self.goToLogin = goToLogin;
        self.goToHome = goToHome;
        self.goToFormTemplates = goToFormTemplates;
        self.goToEditor = goToEditor;
        self.goToPreview = goToPreview;
        self.logout = logout;
        self.goToEditorWithSurveyTemplate = goToEditorWithSurveyTemplate;

        init();

        function init() {
            self.currentState = 'Home';
        }

        function goToLogin() {
            self.currentState = 'Login';
            $state.go(APP_STATE.LOGIN);
        }

        function goToHome() {
            self.currentState = 'Home';
            $state.go(APP_STATE.HOME);
        }

        function goToFormTemplates() {
            self.currentState = 'SurveyTemplates';
            $state.go(APP_STATE.SURVEY_TEMPLATES);
        }

        function goToEditor() {
            self.currentState = 'Edição de Formulário';
            $state.go(APP_STATE.EDITOR);
        }

        function goToPreview() {
            self.currentState = 'Preview de Formulário';
            $state.go(APP_STATE.PREVIEW);
        }

        function goToEditorWithSurveyTemplate(surveyTemplate) {
            self.currentState = 'Edição de Formulário';
            $state.go(APP_STATE.EDITOR, {
                template: surveyTemplate
            });
        }

        function logout() {
            goToLogin();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$scope', '$rootScope'];

    function HomeController($http, $scope, $rootScope) {
        var $HTTP_GET_URL_LOGGED_USER = window.location.origin + '/otus-domain-rest/session/rest/register/loggedUser';

        $scope.loggedUser = {};

        $http.get($HTTP_GET_URL_LOGGED_USER).then(function(response) {
            $scope.loggedUser = response.data.data;
        });

        $scope.isAdmin = function(loggedUser) {
            return loggedUser.admin;
        };

        $scope.isNotAdmin = function(loggedUser) {
            return !(loggedUser.admin);
        };

        $scope.doesNotHasRepository = function() {
            if ($rootScope.repositories) {
                return $rootScope.repositories.length;
            }
        };

    }

}());

(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .controller('DashboardMenuController', DashboardMenuController);

    DashboardMenuController.$inject = [
        'DashboardStateService',
        '$mdSidenav',
        'AuthenticationService'
    ];

    function DashboardMenuController(DashboardStateService, $mdSidenav, AuthenticationService) {
        var self = this;

        /* Public interface */
        self.getSelectedSystemArea = getSelectedSystemArea;
        self.open = open;
        self.close = close;
        self.openHome = openHome;
        self.openFormTemplates = openFormTemplates;
        self.logout = logout;

        function getSelectedSystemArea() {
            return DashboardStateService.currentState;
        }

        function open() {
            $mdSidenav('left').toggle();
        }

        function close() {
            $mdSidenav('left').close();
        }

        function openHome() {
            DashboardStateService.goToHome();
            close();
        }

        function openFormTemplates() {
            DashboardStateService.goToFormTemplates();
            close();
        }

        function logout() {
            AuthenticationService.logout();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .controller('SurveyFormDashboardController', SurveyFormDashboardController);

    SurveyFormDashboardController.$inject = [
        'NewSurveyFormDialogService',
        'DashboardStateService',
        'SurveyEditorService'
    ];

    function SurveyFormDashboardController(NewSurveyFormDialogService, DashboardStateService, SurveyEditorService) {
        var self = this;

        /* Public interface */
        self.startNewSurveyForm = startNewSurveyForm;

        function startNewSurveyForm() {
            NewSurveyFormDialogService.showDialog()
                .onConfirm(function onConfirm(workInitializationData) {
                    SurveyEditorService.startEditor(workInitializationData);
                    DashboardStateService.goToEditor();
                });
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('surveyTemplates', []);

})();

(function() {
    'use strict';

    angular
        .module('editor')
        .service('SurveyEditorService', SurveyEditorService);

    SurveyEditorService.$inject = ['WorkspaceService'];

    function SurveyEditorService(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.startEditor = startEditor;
        self.startEditorWithSurveyTemplate = startEditorWithSurveyTemplate;

        function startEditor(initializationData) {
            WorkspaceService.initializeWorkspace({
                owner: 'visitor'
            });
            WorkspaceService.startNewWork(initializationData);
        }

        function startEditorWithSurveyTemplate(surveyTemplate) {
            WorkspaceService.initializeWorkspace({
                owner: 'visitor'
            });
            WorkspaceService.loadWork(surveyTemplate);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core', []);

}());

(function() {
    'use strict';

    angular
        .module('editor.database', [])
        .config(function($indexedDBProvider) {
            $indexedDBProvider
                .connection('otus-studio')
                .upgradeDatabase(1, function(event, db, tx) {
                    var store = db.createObjectStore('survey_template', { keyPath: 'template_oid'});
                    store.createIndex('contributor_idx', 'contributor', { unique: false });
                });
        });

}());

(function() {
    'use strict';

    angular.module('editor.ui', [
        'angular-bind-html-compile'
    ]);

}());

(function() {
    'use strict';

    angular.module('editor.workspace', []);

}());

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.MapFactory',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService',
    'otusjs.studio.navigationBuilder.navigationInspector.NavigationInspectorService'
  ];

  function service(moduleScope, MapFactory, RouteBuilderService, NavigationInspectorService) {
    var self = this;
    var _survey = null;
    var _navigationMap = {};
    var _activeServiceMode = null;

    /* Public methods */
    self.nodes = nodes;
    self.edges = edges;
    self.setSurvey = setSurvey;
    self.activateRouteCreatorMode = activateRouteCreatorMode;
    self.activateNavigationInspectorMode = activateNavigationInspectorMode;
    self.deactiveMode = deactiveMode;
    self.reloadMapData = reloadMapData;

    function nodes(ids) {
      return _navigationMap.nodes(ids);
    }

    function edges() {
      return _navigationMap.edges();
    }

    function setSurvey(survey) {
      _survey = survey;
      _loadTemplateNavigations(survey.NavigationManager.getNavigationList());
    }

    function activateRouteCreatorMode() {
      deactiveMode();
      _activeServiceMode = RouteBuilderService;
      _activeServiceMode.activate(_survey);
    }

    function activateNavigationInspectorMode() {
      deactiveMode();
      _activeServiceMode = NavigationInspectorService;
      _activeServiceMode.activate(_survey);
    }

    function deactiveMode() {
      if (_activeServiceMode) {
        return _activeServiceMode.deactivate();
      }
    }

    function reloadMapData() {
      _loadTemplateNavigations(_survey.NavigationManager.getNavigationList());
    }

    function _loadTemplateNavigations(templateNavigations) {
      _navigationMap = MapFactory.create();
      _addNodes(templateNavigations);
      _addEdges(templateNavigations);
      moduleScope.store('map', _navigationMap);
    }

    function _addNodes(templateNavigations) {
      templateNavigations.forEach(function(navigation, index) {
        var options = {};
        options.id = navigation.origin;
        options.label = navigation.origin;
        options.index = navigation.index;
        options.isOrphan = navigation.isOrphan();
        options.isMyRootOrphan = navigation.hasOrphanRoot();
        _navigationMap.createNode(options);
      });
    }

    function _addEdges(templateNavigations) {
      templateNavigations.forEach(function(navigation) {
        navigation.routes.forEach(function(route) {
          var options = {};
          options.source = route.origin;
          options.target = route.destination;
          options.isFromOrphan = navigation.isOrphan();

          if (route.isDefault) {
            _navigationMap.createEdgeForDefaultPath(options);
          } else {
            _navigationMap.createEdgeForAlterantivePath(options);
          }
        });
      });
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationBuilderScopeService', service);

  service.$injects = [
    'NBEVENTS',
    'NBMESSAGES'
  ]

  function service(NBEVENTS, NBMESSAGES) {
    var self = this;
    var _scope = null;
    var _moduleData = {};

    self.NBEVENTS = NBEVENTS;
    self.NBMESSAGES = NBMESSAGES;

    /* Public methods */
    self.initialize = initialize;
    self.store = store;
    self.getData = getData;
    self.onEvent = onEvent;
    self.broadcast = broadcast;
    self.emit = emit;
    self.digest = digest;
    self.apply = apply;

    function initialize(scope) {
      scope.events = NBEVENTS;
      scope.messages = NBMESSAGES;
      _scope = scope;
    }

    function store(key, value) {
      _moduleData[key] = value;
    }

    function getData(key) {
      return _moduleData[key];
    }

    function onEvent(event, listener) {
      return _scope.$on(event, listener);
    }

    function broadcast(event, data) {
      _scope.$broadcast(event, data);
    }

    function emit(event, data) {
      _scope.$emit(event, data);
    }

    function digest() {
      _scope.$digest();
    }

    function apply() {
      _scope.$apply();
    }
  }
}());

(function() {
    'use strict';

    angular
      .module('otusjs.studio.navigationBuilder.navigationInspector', []);

}());

(function() {
    'use strict';

    angular.module('otusjs.studio.navigationBuilder.messenger', []);

}());

(function() {
    'use strict';

    angular.module('otusjs.studio.navigationBuilder.routeBuilder', []);

}());

(function() {
  'use strict';

  angular
    .module('preview')
    .service('EditionPreviewService', EditionPreviewService);

  EditionPreviewService.$inject = [
    '$stateParams',
    'AddSurveyItemEventFactory',
    '$timeout',
    '$q'
  ];

  function EditionPreviewService($stateParams, AddSurveyItemEventFactory, $timeout, $q) {
    var self = this;
    var _surveyToLoad;
    var _scope;

    self.isLoading = false;
    self.setScope = setScope;
    self.isLoadingMode = isLoadingMode;
    self.loadSurveyTemplate = loadSurveyTemplate;

    function loadSurveyTemplate() {
      _surveyToLoad = $stateParams.template;
      if (_surveyToLoad.itemContainer.length > 0) {
        self.isLoading = true;
      }
      return _renderSurveyTemplate();
    }

    function _renderSurveyTemplate() {
      var deferred = $q.defer();
      if (!self.isLoading) {
        deferred.reject(true);
      } else {
        if (_scope.$$phase) {
          AddSurveyItemEventFactory.create().load(_surveyToLoad.itemContainer[0]);
          _surveyToLoad.itemContainer.splice(0, 1);
          if (_surveyToLoad.itemContainer.length > 0) {
            $timeout(function() {
              _surveyToLoad.itemContainer.forEach(function(item) {
                AddSurveyItemEventFactory.create().load(item);
                _scope.$digest();
              });
              deferred.resolve($stateParams.template);
            }, 1000);
          } else {
            deferred.resolve($stateParams.template);
          }
        }

      }
      return deferred.promise;
    }

    function isLoadingMode() {
      return $stateParams.template;
    }

    function setScope(scope) {
      _scope = scope;
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('preview')
    .directive('otusSurveyPreviewGenerator', otusSurveyPreviewGenerator);

  function otusSurveyPreviewGenerator() {
    var ddo = {
      restrict: 'A',
      controller: Controller
    };
    return ddo;
  }

  Controller.$inject = [
    '$scope',
    '$element',
    '$compile',
    'WorkspaceService',
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Controller($scope, $element, $compile, WorkspaceService, ActivityFacadeService) {
    var OTUS_SHEET_COMPONENT = '<otus-player md-theme="layoutTheme" layout="column" flex="80"></otus-player>';
    var _newScope;

    $element.on('click', function() {
      var otusSheetDOMElement = $('otus-player');

      if (otusSheetDOMElement[0]) {
        otusSheetDOMElement.remove();
        if (_newScope) {
          _newScope.$destroy();
        }
      }
      _generateOtusPreview();
    });

    function _generateOtusPreview() {
      _newScope = $scope.$new(true);
      _newScope.surveyActivity = {};
      _newScope.surveyActivity.template = _getSurveyTemplateObject();
      var content = $compile(OTUS_SHEET_COMPONENT)(_newScope);
      $('#survey-preview').append(content);
    }

    function _getSurveyTemplateObject() {
      return JSON.parse(WorkspaceService.getSurvey().toJson());
    }
  }

})();

(function(){"use strict";var __slice=[].slice;angular.module("indexedDB",[]).provider("$indexedDB",function(){var IDBKeyRange,allTransactions,apiDirection,appendResultsToPromise,applyNeededUpgrades,cursorDirection,db,dbMode,dbName,dbPromise,dbVersion,defaultQueryOptions,errorMessageFor,indexedDB,readyState,upgradesByVersion;indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,IDBKeyRange=window.IDBKeyRange||window.mozIDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange,dbMode={readonly:"readonly",readwrite:"readwrite"},readyState={pending:"pending"},cursorDirection={next:"next",nextunique:"nextunique",prev:"prev",prevunique:"prevunique"},apiDirection={ascending:cursorDirection.next,descending:cursorDirection.prev},dbName="",dbVersion=1,db=null,upgradesByVersion={},dbPromise=null,allTransactions=[],defaultQueryOptions={useIndex:void 0,keyRange:null,direction:cursorDirection.next},applyNeededUpgrades=function(oldVersion,event,db,tx,$log){var version;for(version in upgradesByVersion)!upgradesByVersion.hasOwnProperty(version)||oldVersion>=version||($log.log("$indexedDB: Running upgrade : "+version+" from "+oldVersion),upgradesByVersion[version](event,db,tx))},errorMessageFor=function(e){return e.target.readyState===readyState.pending?"Error: Operation pending":e.target.webkitErrorMessage||e.target.error.message||e.target.errorCode},appendResultsToPromise=function(promise,results){return void 0!==results?promise.then(function(){return results}):promise},this.connection=function(databaseName){return dbName=databaseName,this},this.upgradeDatabase=function(newVersion,callback){return upgradesByVersion[newVersion]=callback,dbVersion=Math.max.apply(null,Object.keys(upgradesByVersion)),this},this.$get=["$q","$rootScope","$log",function($q,$rootScope,$log){var DbQ,ObjectStore,Query,Transaction,addTransaction,closeDatabase,createDatabaseConnection,keyRangeForOptions,openDatabase,openTransaction,rejectWithError,validateStoreNames;return rejectWithError=function(deferred){return function(error){return $rootScope.$apply(function(){return deferred.reject(errorMessageFor(error))})}},createDatabaseConnection=function(){var dbReq,deferred;return deferred=$q.defer(),dbReq=indexedDB.open(dbName,parseInt(dbVersion)||1),dbReq.onsuccess=function(){db=dbReq.result,$rootScope.$apply(function(){deferred.resolve(db)})},dbReq.onblocked=dbReq.onerror=rejectWithError(deferred),dbReq.onupgradeneeded=function(event){var tx;db=event.target.result,tx=event.target.transaction,$log.log("$indexedDB: Upgrading database '"+db.name+"' from version "+event.oldVersion+" to version "+event.newVersion+" ..."),applyNeededUpgrades(event.oldVersion,event,db,tx,$log)},deferred.promise},openDatabase=function(){return dbPromise||(dbPromise=createDatabaseConnection())},closeDatabase=function(){return openDatabase().then(function(){return db.close(),db=null,dbPromise=null})},validateStoreNames=function(storeNames){var found,storeName,_i,_len;for(found=!0,_i=0,_len=storeNames.length;_len>_i;_i++)storeName=storeNames[_i],found&=db.objectStoreNames.contains(storeName);return found},openTransaction=function(storeNames,mode){return null==mode&&(mode=dbMode.readonly),openDatabase().then(function(){return validateStoreNames(storeNames)?new Transaction(storeNames,mode):$q.reject("Object stores "+storeNames+" do not exist.")})},keyRangeForOptions=function(options){return options.beginKey&&options.endKey?IDBKeyRange.bound(options.beginKey,options.endKey):void 0},addTransaction=function(transaction){return allTransactions.push(transaction.promise),transaction.promise["finally"](function(){var index;return index=allTransactions.indexOf(transaction.promise),index>-1?allTransactions.splice(index,1):void 0})},Transaction=function(){function Transaction(storeNames,mode){null==mode&&(mode=dbMode.readonly),this.transaction=db.transaction(storeNames,mode),this.defer=$q.defer(),this.promise=this.defer.promise,this.setupCallbacks()}return Transaction.prototype.setupCallbacks=function(){return this.transaction.oncomplete=function(_this){return function(){return $rootScope.$apply(function(){return _this.defer.resolve("Transaction Completed")})}}(this),this.transaction.onabort=function(_this){return function(error){return $rootScope.$apply(function(){return _this.defer.reject("Transaction Aborted",error)})}}(this),this.transaction.onerror=function(_this){return function(error){return $rootScope.$apply(function(){return _this.defer.reject("Transaction Error",error)})}}(this),addTransaction(this)},Transaction.prototype.objectStore=function(storeName){return this.transaction.objectStore(storeName)},Transaction.prototype.abort=function(){return this.transaction.abort()},Transaction}(),DbQ=function(){function DbQ(){this.q=$q.defer(),this.promise=this.q.promise}return DbQ.prototype.reject=function(){var args;return args=1<=arguments.length?__slice.call(arguments,0):[],$rootScope.$apply(function(_this){return function(){var _ref;return(_ref=_this.q).reject.apply(_ref,args)}}(this))},DbQ.prototype.rejectWith=function(req){return req.onerror=req.onblocked=function(_this){return function(e){return _this.reject(errorMessageFor(e))}}(this)},DbQ.prototype.resolve=function(){var args;return args=1<=arguments.length?__slice.call(arguments,0):[],$rootScope.$apply(function(_this){return function(){var _ref;return(_ref=_this.q).resolve.apply(_ref,args)}}(this))},DbQ.prototype.notify=function(){var args;return args=1<=arguments.length?__slice.call(arguments,0):[],$rootScope.$apply(function(_this){return function(){var _ref;return(_ref=_this.q).notify.apply(_ref,args)}}(this))},DbQ.prototype.dbErrorFunction=function(){return function(_this){return function(error){return $rootScope.$apply(function(){return _this.q.reject(errorMessageFor(error))})}}(this)},DbQ.prototype.resolveWith=function(req){return this.rejectWith(req),req.onsuccess=function(_this){return function(e){return _this.resolve(e.target.result)}}(this)},DbQ}(),ObjectStore=function(){function ObjectStore(storeName,transaction){this.storeName=storeName,this.store=transaction.objectStore(storeName),this.transaction=transaction}return ObjectStore.prototype.defer=function(){return new DbQ},ObjectStore.prototype._mapCursor=function(defer,mapFunc,req){var results;return null==req&&(req=this.store.openCursor()),results=[],defer.rejectWith(req),req.onsuccess=function(e){var cursor;return(cursor=e.target.result)?(results.push(mapFunc(cursor)),defer.notify(mapFunc(cursor)),cursor["continue"]()):defer.resolve(results)}},ObjectStore.prototype._arrayOperation=function(data,mapFunc){var defer,item,req,results,_i,_len;for(defer=this.defer(),angular.isArray(data)||(data=[data]),_i=0,_len=data.length;_len>_i;_i++)item=data[_i],req=mapFunc(item),results=[],defer.rejectWith(req),req.onsuccess=function(e){return results.push(e.target.result),defer.notify(e.target.result),results.length>=data.length?defer.resolve(results):void 0};return 0===data.length?$q.when([]):defer.promise},ObjectStore.prototype.getAllKeys=function(){var defer,req;return defer=this.defer(),this.store.getAllKeys?(req=this.store.getAllKeys(),defer.resolveWith(req)):this._mapCursor(defer,function(cursor){return cursor.key}),defer.promise},ObjectStore.prototype.clear=function(){var defer,req;return defer=this.defer(),req=this.store.clear(),defer.resolveWith(req),defer.promise},ObjectStore.prototype["delete"]=function(key){var defer;return defer=this.defer(),defer.resolveWith(this.store["delete"](key)),defer.promise},ObjectStore.prototype.upsert=function(data){return this._arrayOperation(data,function(_this){return function(item){return _this.store.put(item)}}(this))},ObjectStore.prototype.insert=function(data){return this._arrayOperation(data,function(_this){return function(item){return _this.store.add(item)}}(this))},ObjectStore.prototype.getAll=function(){var defer;return defer=this.defer(),this.store.getAll?defer.resolveWith(this.store.getAll()):this._mapCursor(defer,function(cursor){return cursor.value}),defer.promise},ObjectStore.prototype.eachWhere=function(query){var defer,direction,indexName,keyRange,req;return defer=this.defer(),indexName=query.indexName,keyRange=query.keyRange,direction=query.direction,req=indexName?this.store.index(indexName).openCursor(keyRange,direction):this.store.openCursor(keyRange,direction),this._mapCursor(defer,function(cursor){return cursor.value},req),defer.promise},ObjectStore.prototype.findWhere=function(query){return this.eachWhere(query)},ObjectStore.prototype.each=function(options){return null==options&&(options={}),this.eachBy(void 0,options)},ObjectStore.prototype.eachBy=function(indexName,options){var q;return null==indexName&&(indexName=void 0),null==options&&(options={}),q=new Query,q.indexName=indexName,q.keyRange=keyRangeForOptions(options),q.direction=options.direction||defaultQueryOptions.direction,this.eachWhere(q)},ObjectStore.prototype.count=function(){var defer;return defer=this.defer(),defer.resolveWith(this.store.count()),defer.promise},ObjectStore.prototype.find=function(key){var defer,req;return defer=this.defer(),req=this.store.get(key),defer.rejectWith(req),req.onsuccess=function(_this){return function(e){return e.target.result?defer.resolve(e.target.result):defer.reject(""+_this.storeName+":"+key+" not found.")}}(this),defer.promise},ObjectStore.prototype.findBy=function(index,key){var defer;return defer=this.defer(),defer.resolveWith(this.store.index(index).get(key)),defer.promise},ObjectStore.prototype.query=function(){return new Query},ObjectStore}(),Query=function(){function Query(){this.indexName=void 0,this.keyRange=void 0,this.direction=cursorDirection.next}return Query.prototype.$lt=function(value){return this.keyRange=IDBKeyRange.upperBound(value,!0),this},Query.prototype.$gt=function(value){return this.keyRange=IDBKeyRange.lowerBound(value,!0),this},Query.prototype.$lte=function(value){return this.keyRange=IDBKeyRange.upperBound(value),this},Query.prototype.$gte=function(value){return this.keyRange=IDBKeyRange.lowerBound(value),this},Query.prototype.$eq=function(value){return this.keyRange=IDBKeyRange.only(value),this},Query.prototype.$between=function(low,hi,exLow,exHi){return null==exLow&&(exLow=!1),null==exHi&&(exHi=!1),this.keyRange=IDBKeyRange.bound(low,hi,exLow,exHi),this},Query.prototype.$desc=function(unique){return this.direction=unique?cursorDirection.prevunique:cursorDirection.prev,this},Query.prototype.$asc=function(unique){return this.direction=unique?cursorDirection.nextunique:cursorDirection.next,this},Query.prototype.$index=function(indexName){return this.indexName=indexName,this},Query}(),{openStore:function(storeName,callBack,mode){return null==mode&&(mode=dbMode.readwrite),openTransaction([storeName],mode).then(function(transaction){var results;return results=callBack(new ObjectStore(storeName,transaction)),appendResultsToPromise(transaction.promise,results)})},openStores:function(storeNames,callback,mode){return null==mode&&(mode=dbMode.readwrite),openTransaction(storeNames,mode).then(function(transaction){var objectStores,results,storeName;return objectStores=function(){var _i,_len,_results;for(_results=[],_i=0,_len=storeNames.length;_len>_i;_i++)storeName=storeNames[_i],_results.push(new ObjectStore(storeName,transaction));return _results}(),results=callback.apply(null,objectStores),appendResultsToPromise(transaction.promise,results)})},openAllStores:function(callback,mode){return null==mode&&(mode=dbMode.readwrite),openDatabase().then(function(_this){return function(){var objectStores,results,storeName,storeNames,transaction;return storeNames=Array.prototype.slice.apply(db.objectStoreNames),transaction=new Transaction(storeNames,mode),objectStores=function(){var _i,_len,_results;for(_results=[],_i=0,_len=storeNames.length;_len>_i;_i++)storeName=storeNames[_i],_results.push(new ObjectStore(storeName,transaction));return _results}(),results=callback.apply(null,objectStores),appendResultsToPromise(transaction.promise,results)}}(this))},closeDatabase:function(){return closeDatabase()},deleteDatabase:function(){return closeDatabase().then(function(){var defer;return defer=new DbQ,defer.resolveWith(indexedDB.deleteDatabase(dbName)),defer.promise})["finally"](function(){return $log.log("$indexedDB: "+dbName+" database deleted.")})},queryDirection:apiDirection,flush:function(){return allTransactions.length>0?$q.all(allTransactions):$q.when([])},databaseInfo:function(){return openDatabase().then(function(){var storeNames,transaction;return transaction=null,storeNames=Array.prototype.slice.apply(db.objectStoreNames),openTransaction(storeNames,dbMode.readonly).then(function(transaction){var store,storeName,stores;return stores=function(){var _i,_len,_results;for(_results=[],_i=0,_len=storeNames.length;_len>_i;_i++)storeName=storeNames[_i],store=transaction.objectStore(storeName),_results.push({name:storeName,keyPath:store.keyPath,autoIncrement:store.autoIncrement,indices:Array.prototype.slice.apply(store.indexNames)});return _results}(),transaction.promise.then(function(){return{name:db.name,version:db.version,objectStores:stores}})})})}}}]})}).call(this);
//# sourceMappingURL=angular-indexed-db.min.js.map

(function() {
    'use strict';

    angular
        .module('otus.textEdition')
        .controller('otus.textEdition.TextEditionMenuController', controller);

    controller.$inject = ['$scope', '$mdDialog', 'otus.textEdition.ColorContext'];

    function controller($scope, $mdDialog, ColorContext) {
        var self = this;

        self.bold = bold;
        self.italic = italic;
        self.underlined = underlined;
        self.strikeThrough = strikeThrough;
        self.openColors = openColors;
        self.foreColor = foreColor;
        self.hiliteColor = hiliteColor;
        self.justifyCenter = justifyCenter;
        self.justifyLeft = justifyLeft;
        self.justifyRight = justifyRight;
        self.justifyFull = justifyFull;
        self.removeFormat = removeFormat;

        function bold() {
            document.execCommand('bold', false, null);
            return false;
        }

        function italic() {
            document.execCommand('italic', false, null);
            return false;
        }

        function underlined() {
            document.execCommand('underline', false, null);
            return false;
        }

        function strikeThrough() {
            document.execCommand('strikeThrough', false, null);
            return false;
        }

        function foreColor() {
            var textColor = ColorContext.textColor;
            document.execCommand('ForeColor', false, textColor);
            return false;
        }

        function hiliteColor() {
            var backgroundColor = ColorContext.backgroundColor;
            document.execCommand('HiliteColor', false, backgroundColor);
            return false;
        }

        function justifyCenter() {
            document.execCommand('justifyCenter', false, null);
            return false;
        }

        function justifyFull() {
            document.execCommand('justifyFull', false, null);
            return false;
        }

        function justifyLeft() {
            document.execCommand('justifyLeft', false, null);
            return false;
        }

        function justifyRight() {
            document.execCommand('justifyRight', false, null);
            return false;
        }

        function removeFormat() {
            document.execCommand('removeFormat', false, null);
            return false;
        }

        function openColors() {
            $mdDialog.show({
                templateUrl: 'app/shared/text-edition-menu/color/color-picker-template.html',
                controller: 'otus.textEdition.ColorController as controller',
                clickOutsideToClose: true
            });
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.textEdition')
        .directive('otusTextEditionMenu', directive);

    function directive() {
        var ddo = {
            templateUrl: 'app/shared/text-edition-menu/text-edition-menu-template.html',
            retrict: 'E',
            controller: 'otus.textEdition.TextEditionMenuController as controller'
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('otus.textEdition', [
            'mdColorPicker'
        ]);

}());

(function() {

    angular
        .module('ui.components', []);

}());

(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('LogoutDialogService', LogoutDialogService);

    LogoutDialogService.$inject = ['$mdDialog'];

    function LogoutDialogService($mdDialog) {
        var self = this;

        /* Public interface */
        self.showDialog = showDialog;

        init();

        function init() {
            self.dialogSettings = {
                parent: angular.element(document.body),
                templateUrl: 'app/dashboard/dialog/logout/logout-dialog.html',
                controller: DialogController,
                controllerAs: 'controller',
                openFrom: '#system-toolbar',
                closeTo: {
                    bottom: 0
                }
            };
        }

        function showDialog() {
            $mdDialog
                .show(self.dialogSettings)
                .then(
                    forwardSuccessfulExecution,
                    forwardUnsuccessfulExecution
                );

            return {
                onConfirm: function (callback) {
                    self.callback = callback;
                }
            };
        }

        function forwardSuccessfulExecution(response) {
            if (response.action == 'confirm') {
                if (self.callback) self.callback(response.data);
            }
        }

        function forwardUnsuccessfulExecution() {
        }
    }

    function DialogController($mdDialog) {
        var self = this;

        /* Public interface */
        self.cancel = cancel;
        self.confirm = confirm;

        function cancel(response) {
            $mdDialog.hide(response);
        }

        function confirm(response) {
            $mdDialog.hide(response);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .directive('otusToolbar', otusToolbar);

    function otusToolbar() {
        var ddo = {
            templateUrl: 'app/dashboard/menu/toolbar/menu-toolbar.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .service('SelectedSurveyTemplatesManagementService', SelectedSurveyTemplatesManagementService);

    function SelectedSurveyTemplatesManagementService() {
        var self = this;
        self.selectedSurveyTemplates = [];

        self.selectSurveyTemplate = selectSurveyTemplate;
        self.removeSurveyTemplate = removeSurveyTemplate;
        self.hasSelectedSurveyTemplate = hasSelectedSurveyTemplate;
        self.hasOnlyOneSelectedSurveyTemplate = hasOnlyOneSelectedSurveyTemplate;

        function selectSurveyTemplate(template) {
            self.selectedSurveyTemplates.push(template);
        }

        function removeSurveyTemplate(template) {
            self.selectedSurveyTemplates.splice(_getSelectedTemplateIndex(template), 1);
        }

        function hasSelectedSurveyTemplate() {
            return self.selectedSurveyTemplates.length !== 0;
        }

        function hasOnlyOneSelectedSurveyTemplate() {
            return self.selectedSurveyTemplates.length === 1;
        }

        /* Private methods */
        function _getSelectedTemplateIndex(template) {
            return self.selectedSurveyTemplates.indexOf(template);
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .service('SurveyTemplateManagerService', SurveyTemplateManagerService);

    SurveyTemplateManagerService.$inject = [
        'CrossSessionDatabaseService',
        'SurveyExportService'
    ];

    function SurveyTemplateManagerService(CrossSessionDatabaseService, SurveyExportService) {
        var self = this;
        self.surveyTemplates = [];

        self.initializeSurveyTemplateList = initializeSurveyTemplateList;
        self.deleteSurveyTemplate = deleteSurveyTemplate;
        self.exportSurveyTemplate = exportSurveyTemplate;
        self.editSurveyTemplate = editSurveyTemplate;

        function initializeSurveyTemplateList() {
            var promise = CrossSessionDatabaseService.getAllSurveyTemplatesByContributor();
            promise.then(function(value) {
                self.surveyTemplates = value;
            });
        }

        function deleteSurveyTemplate(template) {
            CrossSessionDatabaseService.deleteSurveyTemplate(template.template_oid);
            _removeOfSurveyTemplatesList(template);
        }

        function exportSurveyTemplate(template) {
            return SurveyExportService.exportSurvey(JSON.stringify(template.template));
        }

        function editSurveyTemplate(template) {
                
        }

        /* Private methods */
        function _getTemplateIndex(template) {
            return self.surveyTemplates.indexOf(template);
        }

        function _removeOfSurveyTemplatesList(template) {
            self.surveyTemplates.splice(_getTemplateIndex(template), 1);
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .directive('surveyTemplateUpload', SurveyTemplateUpload);

    SurveyTemplateUpload.$inject = ['SurveyTemplateUploadService'];

    function SurveyTemplateUpload(SurveyTemplateUploadService) {
        var ddo = {
            restrict: 'A',
            link: linkFunction
        };
        return ddo;

        function linkFunction($scope, $element, $attrs) {
            var fileUploadElement;

            $element.on('click', function() {
                fileUploadElement = _createInput();
                fileUploadElement.click();
                fileUploadElement.addEventListener('change', function() {
                    var fileToUpload = this.files[0];
                    _uploadSurveyTemplate(fileToUpload);
                });
            });

            function _uploadSurveyTemplate(fileToUpload) {
                SurveyTemplateUploadService.upload(fileToUpload);
            }

            function _createInput() {
                fileUploadElement = document.createElement('input');
                fileUploadElement.setAttribute('type', 'file');
                fileUploadElement.setAttribute('accept', '.json');
                return fileUploadElement;
            }
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .service('SurveyTemplateUploadService', SurveyTemplateUploadService);

    SurveyTemplateUploadService.$inject = [
        'CrossSessionDatabaseService',
        'SurveyTemplateManagerService',
        '$mdToast'
    ];

    function SurveyTemplateUploadService(CrossSessionDatabaseService, SurveyTemplateManagerService, $mdToast) {
        var self = this;
        var jsonReaded;

        self.upload = upload;

        function upload(fileSurveyTemplate) {
            var reader = new FileReader();
            reader.readAsText(fileSurveyTemplate);

            reader.onload = function() {
                jsonReaded = reader.result;

                var promise = CrossSessionDatabaseService.insertSurveyTemplate(jsonReaded, {
                    owner: 'visitor'
                });

                promise.then(function(value) {
                    if (value) {
                        $mdToast.show($mdToast.simple().textContent('Upload realizado com sucesso!'));
                    }
                }, function(error) {
                    $mdToast.show($mdToast.simple().textContent(_getErrorMessage(error)));
                });

                /** Reload list of Survey Templates */
                SurveyTemplateManagerService.initializeSurveyTemplateList();
            };
        }

        function _getErrorMessage(error) {
            var message;
            switch (error) {
                case 'Key already exists in the object store.':
                    message = 'Esse template já existe.';
                    break;
                default:
                    message = 'Ocorreu um erro ao realizar o upload';
            }
            return message;
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .directive('surveyTemplatesExport', surveyTemplatesExport);

    surveyTemplatesExport.$inject = [
        'SurveyTemplateManagerService',
        '$mdToast',
        '$timeout',
        'SelectedSurveyTemplatesManagementService'
    ];

    function surveyTemplatesExport(SurveyTemplateManagerService, $mdToast, $timeout, SelectedSurveyTemplatesManagementService) {
        var ddo = {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    SelectedSurveyTemplatesManagementService.selectedSurveyTemplates.forEach(function(template) {
                        var downloadElement = document.createElement('a');
                        downloadElement.setAttribute('href', SurveyTemplateManagerService.exportSurveyTemplate(template));
                        downloadElement.setAttribute('download', 'surveyTemplate.json');
                        downloadElement.setAttribute('target', '_blank');
                        downloadElement.click();
                    });
                    $timeout(function() {
                        $mdToast.show($mdToast.simple().textContent('Template(s) exportado(s) com sucesso!'));
                    }, 1000);

                });
            }
        };
        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddAnswerOptionEventFactory', AddAnswerOptionEventFactory);

    AddAnswerOptionEventFactory.$inject = [
        'AddAnswerOptionService',
        'WorkspaceService'
    ];

    function AddAnswerOptionEventFactory(AddAnswerOptionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddAnswerOptionEvent(AddAnswerOptionService, WorkspaceService);
        }

        return self;
    }

    function AddAnswerOptionEvent(AddAnswerOptionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var option = AddAnswerOptionService.execute(eventSource.getItem());
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddFillingRulesEventFactory', AddFillingRulesEventFactory);

    AddFillingRulesEventFactory.$inject = [
        'AddFillingRulesService',
        'WorkspaceService'
    ];

    function AddFillingRulesEventFactory(AddFillingRulesService, WorkspaceService) {
        var self = this;

        self.create = create;

        function create() {
            return new AddFillingRulesEvent(AddFillingRulesService, WorkspaceService);
        }

        return self;
    }

    function AddFillingRulesEvent(AddFillingRulesService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(questionReference, validator) {
            var option = AddFillingRulesService.execute(questionReference, validator);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddMetadataAnswerEventFactory', AddMetadataAnswerEventFactory);

    AddMetadataAnswerEventFactory.$inject = [
        'AddMetadataAnswerService',
        'WorkspaceService'
    ];

    function AddMetadataAnswerEventFactory(AddMetadataAnswerService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddMetadataAnswerEvent(AddMetadataAnswerService, WorkspaceService);
        }

        return self;
    }

    function AddMetadataAnswerEvent(AddMetadataAnswerService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var option = AddMetadataAnswerService.execute(eventSource.getItem());
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRouteConditionEventFactory', AddRouteConditionEventFactory);

    AddRouteConditionEventFactory.$inject = [
        'AddRouteConditionService',
        'WorkspaceService'
    ];

    function AddRouteConditionEventFactory(AddRouteConditionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRouteConditionEvent(AddRouteConditionService, WorkspaceService);
        }

        return self;
    }

    function AddRouteConditionEvent(AddRouteConditionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(conditionName, route) {
            var routeCondition = AddRouteConditionService.execute(conditionName, route);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();

            return routeCondition;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRouteEventFactory', AddRouteEventFactory);

    AddRouteEventFactory.$inject = [
        'AddRouteService',
        'WorkspaceService'
    ];

    function AddRouteEventFactory(AddRouteService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRouteEvent(AddRouteService, WorkspaceService);
        }

        return self;
    }

    function AddRouteEvent(AddRouteService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(routeData) {
            var route = AddRouteService.execute(routeData);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return route;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddRuleEventFactory', AddRuleEventFactory);

    AddRuleEventFactory.$inject = [
        'AddRuleService',
        'WorkspaceService'
    ];

    function AddRuleEventFactory(AddRuleService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddRuleEvent(AddRuleService, WorkspaceService);
        }

        return self;
    }

    function AddRuleEvent(AddRuleService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(ruleData, route) {
            var rule = AddRuleService.execute(ruleData, route);

            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();

            return rule;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddSurveyItemEventFactory', AddSurveyItemEventFactory);

    AddSurveyItemEventFactory.$inject = [
        '$rootScope',
        'WorkspaceService',
        'WidgetService',
        'SheetContentService',
        'AddSurveyItemService',
        'LoadSurveyItemService',
        'PageAnchorService',
        '$timeout'
    ];

    function AddSurveyItemEventFactory($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, LoadSurveyItemService, PageAnchorService, $timeout) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, LoadSurveyItemService, PageAnchorService, $timeout);
        }

        return self;
    }

    function AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, LoadSurveyItemService, PageAnchorService, $timeout) {
        var self = this;

        self.execute = execute;
        self.load = load;

        function execute(itemType) {
            var item = AddSurveyItemService.execute(itemType, WorkspaceService.getSurvey());
            SheetContentService.loadQuestion(item);
            $rootScope.$broadcast('item.add', item);
            WorkspaceService.workspace.currentItem = item;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }

        function load(itemToLoad) {
            var newItem = LoadSurveyItemService.execute(itemToLoad, WorkspaceService.getSurvey());
            //copy data from itemToLoad to newItem
            if (itemToLoad.customID) {
                newItem.customID = itemToLoad.customID;
            } else {
                newItem.customID = newItem.templateID;
            }

            if (newItem.isQuestion()) {
                newItem.label = itemToLoad.label;
                newItem.metadata.options = itemToLoad.metadata.options;
                newItem.fillingRules.options = itemToLoad.fillingRules.options;

                if (itemToLoad.objectType === 'SingleSelectionQuestion' || itemToLoad.objectType === 'CheckboxQuestion') {
                    newItem.options = itemToLoad.options;
                }

                if (itemToLoad.objectType === 'DecimalQuestion' || itemToLoad.objectType === 'IntegerQuestion') {
                    newItem.unit = itemToLoad.unit;
                }
            } else {
                if (itemToLoad.objectType === 'ImageItem') {
                    newItem.url = itemToLoad.url;
                    newItem.footer = itemToLoad.footer;
                } else {
                    newItem.value = itemToLoad.value;
                }
            }

            SheetContentService.loadQuestion(newItem);
            $rootScope.$broadcast('item.add', newItem);
            WorkspaceService.workspace.currentItem = newItem;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveAnswerOptionEventFactory', RemoveAnswerOptionEventFactory);

    RemoveAnswerOptionEventFactory.$inject = [
        'RemoveAnswerOptionService',
        'WorkspaceService'
    ];

    function RemoveAnswerOptionEventFactory(RemoveAnswerOptionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveAnswerOptionEvent(RemoveAnswerOptionService, WorkspaceService);
        }

        return self;
    }

    function RemoveAnswerOptionEvent(RemoveAnswerOptionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            RemoveAnswerOptionService.execute(eventSource.getItem());
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveFillingRulesEventFactory', RemoveFillingRulesEventFactory);

    RemoveFillingRulesEventFactory.$inject = [
        'RemoveFillingRulesWorkService',
        'WorkspaceService'
    ];

    function RemoveFillingRulesEventFactory(RemoveFillingRulesWorkService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveFillingRulesEvent(RemoveFillingRulesWorkService, WorkspaceService);
        }

        return self;
    }

    function RemoveFillingRulesEvent(RemoveFillingRulesWorkService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(questionSource, fillingRuleType) {
            RemoveFillingRulesWorkService.execute(questionSource.getItem(), fillingRuleType);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveMetadataOptionEventFactory', RemoveMetadataOptionEventFactory);

    RemoveMetadataOptionEventFactory.$inject = [
        'RemoveMetadataOptionService',
        'WorkspaceService'
    ];

    function RemoveMetadataOptionEventFactory(RemoveMetadataOptionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveMetadataOptionEvent(RemoveMetadataOptionService, WorkspaceService);
        }

        return self;
    }

    function RemoveMetadataOptionEvent(RemoveMetadataOptionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            RemoveMetadataOptionService.execute(eventSource.getItem());
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveRouteEventFactory', RemoveRouteEventFactory);

    RemoveRouteEventFactory.$inject = [
        'RemoveRouteService',
        'WorkspaceService'
    ];

    function RemoveRouteEventFactory(RemoveRouteService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveRouteEvent(RemoveRouteService, WorkspaceService);
        }

        return self;
    }

    function RemoveRouteEvent(RemoveRouteService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(routeData) {
            RemoveRouteService.execute(routeData);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveRuleEventFactory', RemoveRuleEventFactory);

    RemoveRuleEventFactory.$inject = [
        'RemoveRuleService',
        'WorkspaceService'
    ];

    function RemoveRuleEventFactory(RemoveRuleService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveRuleEvent(RemoveRuleService, WorkspaceService);
        }

        return self;
    }

    function RemoveRuleEvent(RemoveRuleService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(rule, route) {
            RemoveRuleService.execute(rule, route);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveSurveyItemEventFactory', RemoveSurveyItemEventFactory);

    RemoveSurveyItemEventFactory.$inject = [
        '$rootScope',
        'WorkspaceService',
        'RemoveSurveyItemService',
    ];

    function RemoveSurveyItemEventFactory($rootScope, WorkspaceService, RemoveSurveyItemService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveSurveyItemEvent($rootScope, WorkspaceService, RemoveSurveyItemService);
        }

        return self;
    }

    function RemoveSurveyItemEvent($rootScope, WorkspaceService, RemoveSurveyItemService) {
        var self = this;

        self.execute = execute;

        function execute(item) {
            RemoveSurveyItemService.execute(item, WorkspaceService.getSurvey());
            $rootScope.$broadcast('item.remove.' + item.templateID, item);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateFillingRulesEventFactory', UpdateFillingRulesEventFactory);

    UpdateFillingRulesEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateFillingRulesEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateFillingRulesEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateFillingRulesEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute() {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateQuestionEventFactory', UpdateQuestionEventFactory);

    UpdateQuestionEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateQuestionEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateQuestionEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateQuestionEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateRouteEventFactory', UpdateRouteEventFactory);

    UpdateRouteEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateRouteEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateRouteEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateRouteEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('UpdateRuleEventFactory', UpdateRuleEventFactory);

    UpdateRuleEventFactory.$inject = [
        'WorkspaceService'
    ];

    function UpdateRuleEventFactory(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateRuleEvent(WorkspaceService);
        }

        return self;
    }

    function UpdateRuleEvent(WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.database')
        .service('CrossSessionDatabaseService', CrossSessionDatabaseService);

    CrossSessionDatabaseService.$inject = [
        '$q',
        '$indexedDB',
        'InsertHelperService'
    ];

    function CrossSessionDatabaseService($q, $indexedDB, InsertHelperService) {
        var self = this,
            STORE_NAME = 'survey_template',
            INDEX = 'contributor_idx';

        /* Public interface */
        self.saveSurveyTemplateRevision = saveSurveyTemplateRevision;
        self.getAllSurveyTemplates = getAllSurveyTemplates;
        self.getAllSurveyTemplatesByContributor = getAllSurveyTemplatesByContributor;
        self.deleteSurveyTemplate = deleteSurveyTemplate;
        self.insertSurveyTemplate = insertSurveyTemplate;
        self.findSurveyTemplateByOID = findSurveyTemplateByOID;

        function saveSurveyTemplateRevision(template, session) {
            $indexedDB.openStore(STORE_NAME, function(store) {
                var entry = {};
                entry.template_oid = template.oid;
                entry.contributor = session.owner;
                entry.template = JSON.parse(template.toJson());                
                store.upsert(entry).then(function(e) {});

            });
        }

        function insertSurveyTemplate(template, session) {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                var parsedTemplate = JSON.parse(template);
                var entry = {};
                entry.template_oid = parsedTemplate.oid;
                entry.contributor = session.owner;
                entry.template = parsedTemplate;
                store.insert(entry).then(function(success) {
                    defer.resolve(success);
                }, function(error) {
                    defer.reject(error);
                });
            });
            return defer.promise;
        }

        function getAllSurveyTemplates() {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                store.getAll().then(function(templates) {
                    defer.resolve(templates);
                });
            });
            return defer.promise;
        }

        function getAllSurveyTemplatesByContributor() {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {

                var criteria = store.query();
                criteria = criteria.$eq('visitor');
                criteria = criteria.$index(INDEX);

                store.eachWhere(criteria).then(function(templates) {
                    defer.resolve(templates);
                });
            });
            return defer.promise;
        }

        function deleteSurveyTemplate(templateOID) {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                store.delete(templateOID).then(function() {
                    defer.resolve(true);
                });
            });
            return defer.promise;
        }

        /**
         * Returns a User + UUID Template + Repository in Base64
         */
        function getAllKeys() {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                store.getAllKeys().then(function(e) {
                    defer.resolve(e);
                });
            });
            return defer.promise;
        }

        function findSurveyTemplateByOID(oid) {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                store.find(oid).then(function(template) {
                    defer.resolve(template);
                });
            });
            return defer.promise;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.database')
        .service('InsertHelperService', InsertHelperService);

    function InsertHelperService() {
        var self = this;

        /* Public interface */
        self.cloneObject = cloneObject;

        function cloneObject(object) {
            var clone = {};

            Object.keys(object).forEach(function filterProperties(key) {
                var property = object[key];
                if (property instanceof Function) {
                    clone[key] = property;
                }
            });

            return clone;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.database')
        .factory('InSessionDatabaseFactory', InSessionDatabaseFactory);

    InSessionDatabaseFactory.$inject = ['Loki'];

    function InSessionDatabaseFactory(Loki) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new InSessionDatabase(Loki);
        }

        return self;
    }

    function InSessionDatabase(Loki) {
        var self = this;
        var instance = null;

        var USER_EDITS_COLLECTION = 'userEdits';
        var DATA_POOL_COLLECTION = 'dataPool';

        init();

        function init() {
            instance = new Loki('in-session-db.json');
            self[USER_EDITS_COLLECTION] = new CollectionFacade(instance.addCollection(USER_EDITS_COLLECTION));
            self[DATA_POOL_COLLECTION] = new CollectionFacade(instance.addCollection(DATA_POOL_COLLECTION));
        }
    }

    function CollectionFacade(collectionReference) {
        var self = this;

        /* Public interface */
        self.store = store;
        self.fetchEventBy = fetchEventBy;
        self.fetchLastSelectEvent = fetchLastSelectEvent;
        self.fetchLastAddedData = fetchLastAddedData;
        self.storeUnique = storeUnique;

        init();

        function init() {
            Object.defineProperty(self, 'collection', {
                value: collectionReference,
                writable: false
            });
        }

        function store(data) {
            self.collection.insert(data);
        }

        function storeUnique(data) {
            var event = fetchEventBy('id', data.source.id);

            if (!event) {
                self.collection.insert(data);

            } else {
                remove(event);
                store(data);
            }
        }

        function fetchEventBy(attribute, value) {
            var data = self.collection.chain()
                        .where(function(obj) {
                            return getModelValue(attribute, obj) === value;
                        })
                        .simplesort('$loki', 'isdesc').data();

            return data;
        }

        function fetchLastSelectEvent() {
            var data = self.collection.chain()
                        .where(function(event) {
                            return event.type.isSelectData();
                        })
                        .simplesort('$loki', 'isdesc').data();

            return data[0];
        }

        function fetchLastAddedData() {
            var data = self.collection.chain().simplesort('$loki', 'isdesc').data();
            return data[0];
        }

        function remove(data) {
            self.collection.remove(data);
        }

        function getModelValue(modelpath, model) {
            var pathArray = modelpath.split('.');
            var modelValue = model;

            pathArray.forEach(function(path) {
                modelValue = modelValue[path];
            });

            return modelValue;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('editor.ui.mpath', mpath);

    function mpath() {
        var self = this;

        var MODULE = 'app/editor/ui/';
        var QUESTION_EDITOR_TEMPLATE = 'app/editor/ui/core/survey-item-editor/survey-item-editor.html';
        var METADATA_TEMPLATE = 'app/editor/ui/core/metadata/metadata-question-template.html';

        /* Public interface */
        self.getWidgetPath = getWidgetPath;
        self.getQuestionEditorWidgetPath = getQuestionEditorWidgetPath;
        self.getMetadataWidgetPath = getMetadataWidgetPath;

        function getWidgetPath(directive) {
            return MODULE.concat('core/question/'.concat(directive).concat('/'.concat(directive.concat('-question-template.html'))));
        }

        function getQuestionEditorWidgetPath() {
            return QUESTION_EDITOR_TEMPLATE;
        }

        function getMetadataWidgetPath() {
            return METADATA_TEMPLATE;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('UiBindingService', UiBindingService);

    function UiBindingService() {
        var self = this;

        /* Public interface */
        self.setScope = setScope;

        function setScope(scope) {
            scope.$on('otusWidgetPreLoad', function(event) {
                //TODO
            });

            scope.$on('otusWidgetBinding', function(event) {
                //TODO
            });
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = [
        'WidgetTemplateService',
        'SurveyItemWidgetFactory',
        'SurveyItemEditorWidgetFactory',
        'AnswerOptionWidgetFactory',
        'MetadataGroupWidgetFactory',
        'MetadataOptionWidgetFactory'
    ];

    function WidgetService(WidgetTemplateService, SurveyItemWidgetFactory, SurveyItemEditorWidgetFactory, AnswerOptionWidgetFactory,
        MetadataGroupWidgetFactory, MetadataOptionWidgetFactory) {

        var self = this;

        self.widgetMap = {};

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getMetadataWidget = getMetadataWidget;
        self.getSurveyItemEditorWidget = getSurveyItemEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;
        self.getMetadataAnswerOptionWidget = getMetadataAnswerOptionWidget;

        function getWidgetForModel(model) {
            var widget = SurveyItemWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate(model.objectType);
            return widget;
        }

        function getMetadataWidget(model) {
            var widget = MetadataGroupWidgetFactory.create(model);
            widget.template = WidgetTemplateService.getDirectiveTemplate('MetadataGroup');
            return widget;
        }

        function getSurveyItemEditorWidget(question) {
            return SurveyItemEditorWidgetFactory.create(question);
        }

        function getQuestionAnswerOptionWidget(model) {
            return AnswerOptionWidgetFactory.create(model);
        }

        function getMetadataAnswerOptionWidget(model) {
            return MetadataOptionWidgetFactory.create(model);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('WidgetTemplateService', WidgetTemplateService);

    function WidgetTemplateService() {
        var self = this,

            directiveTemplates = {
                'CalendarQuestion': '<calendar-question></calendar-question>',
                'IntegerQuestion': '<integer-question></integer-question>',
                'SingleSelectionQuestion': '<single-selection-question></single-selection-question>',
                'TextQuestion': '<text-question></text-question>',
                'TimeQuestion': '<time-question></time-question>',
                'PhoneQuestion': '<phone-question></phone-question>',
                'CheckboxQuestion': '<checkbox-question></checkbox-question>',
                'MetadataGroup' : '<metadata-question></metadata-question>',

            };

        /* Public interface */
        self.getDirectiveTemplate = getDirectiveTemplate;

        function getDirectiveTemplate(directive) {
            return directiveTemplates[directive];
        }
    }

}());

(function() {

    angular
        .module('editor.ui')
        .controller('EditorToolbarController', EditorToolbarController);

    EditorToolbarController.$inject = [
        'WorkspaceService'
    ];

    function EditorToolbarController(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.saveOfflineWork = saveOfflineWork;
        self.isSurveyEmpty = isSurveyEmpty;

        function saveOfflineWork() {
            WorkspaceService.saveWork();
        }

        function isSurveyEmpty() {
            return WorkspaceService.getSurvey().SurveyItemManager.getItemListSize() === 0 ? true : false;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('MainContainerContentService', MainContainerContentService);

    function MainContainerContentService() {
        var self = this,
            controllerReference = null;

        /* Public interface */
        self.showQuestionDataEditor = showQuestionDataEditor;
        self.init = init;

        function init(cotroller) {
            controllerReference = cotroller;
        }

        function showQuestionDataEditor(data) {
        }
    }

}());

(function() {

  angular
    .module('editor.ui')
    .controller('MainContainerController', MainContainerController);

  MainContainerController.$inject = [
    '$scope',
    '$window',
    'MainContainerContentService',
    'UiBindingService',
    '$mdBottomSheet',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'WorkspaceService',
    'NBEVENTS',
    'otusjs.player.core.player.PlayerService'
  ];

  function MainContainerController(
    $scope, $window, MainContainerContentService, UiBindingService, $mdBottomSheet,
    NavigationBuilderScopeService, WorkspaceService, NBEVENTS, PlayerService) {

    var self = this;

    self.showQuestionsMenu = showQuestionsMenu;
    self.startNavigationBuilder = startNavigationBuilder;
    self.startPreview = startPreview;

    init();

    function init() {
      MainContainerContentService.init(self);
      UiBindingService.setScope($scope);
    }

    function showQuestionsMenu() {
      $mdBottomSheet.show({
        templateUrl: 'app/editor/ui/survey-item-palette/bottom-sheet.html',
        disableParentScroll: false
      });
    }

    function startNavigationBuilder() {
      var $navContainer = $('#navigation-preview-container');
      var $tabContainer = $navContainer.parent().parent().parent();
      $navContainer.css('margin-top', '10px');
      $navContainer.css('height', ($tabContainer.height() - 10) + 'px');
      $window.addEventListener('resize', function() {
        $navContainer.css('height', ($tabContainer.height() - 10) + 'px');
      });

      NavigationBuilderScopeService.broadcast(NBEVENTS.NAVIGATION_BUILDER_ON, WorkspaceService.getSurvey());
      NavigationBuilderScopeService.onEvent(NBEVENTS.NAVIGATION_UPDATED, WorkspaceService.saveWork);
    }

    function startPreview() {
      PlayerService.setup();
    }
  }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .component('otusPageAnchor', {
            templateUrl: 'app/editor/ui/page-anchor-item/page-anchor-template.html',
            controller: AnchorController,
            bindings: {
                id: '<'
            }
        });

    AnchorController.$inject = [
        '$element',
        'PageAnchorService'
    ];

    function AnchorController($element, PageAnchorService) {
        var self = this;

        self.$onInit = function() {
            $element.attr('tabindex', -1);
            PageAnchorService.anchorRegistry($element);
        };
    }

}());

(function() {
    angular
        .module('editor.ui')
        .service('PageAnchorService', PageAnchorService);

    function PageAnchorService() {
        var self = this;
        var anchorList = {};

        // public interface
        self.sheetAutoFocus = sheetAutoFocus;
        self.anchorRegistry = anchorRegistry;


        function anchorRegistry(anchorElement) {
            anchorList[anchorElement[0].id] = anchorElement;
        }

        function sheetAutoFocus(sheet) {
            var childrenNb = sheet.children().length;
            if (childrenNb > 6) {
                _focusOnBottom();
            } else {
                _focusOnTop();
            }
        }

        function _focusOnTop() {
            if (anchorList['top-anchor']) {
                anchorList['top-anchor'].focus();
            }
        }

        function _focusOnBottom() {
            if (anchorList['bottom-anchor']) {
                anchorList['bottom-anchor'].focus();
            }
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusEditionSheet', otusSheet);

    function otusSheet() {
        var ddo = {
            restrict: 'E',
            controller: 'SheetController',
            controllerAs: 'sheetController',
            templateUrl: 'app/editor/ui/sheet/sheet.html'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SheetContentService', SheetContentService);

    SheetContentService.$inject = [
        'TemplateLoaderService',
        'PageAnchorService'
    ];

    function SheetContentService(TemplateLoaderService, PageAnchorService, $q, $timeout) {
        var self = this;
        var scope = null;
        var sheet = null;

        /* Public interface */
        self.init = init;
        self.loadQuestion = loadQuestion;
        self.loadItem = loadItem;
        self.unloadQuestion = unloadQuestion;
        self.updateQuestion = updateQuestion;

        function init(scopeReference, sheetReference) {
            scope = scopeReference;
            sheet = sheetReference;
        }

        function loadQuestion(item) {
            self.lastLoadedQuestion = item;
            var content = TemplateLoaderService.loadDirective('<otus:survey-item-editor></otus:survey-item-editor>', scope);
            var sheetTemplate = sheet.find('#sheet').append(content);
            PageAnchorService.sheetAutoFocus(sheetTemplate);
        }

        function loadItem(item) {
            self.lastLoadedQuestion = item;
            var content = TemplateLoaderService.loadDirective('<otus:page-item-editor></otus:page-item-editor>', scope);
            sheet.find('#sheet').append(content);
            PageAnchorService.sheetAutoFocus(sheetTemplate);
        }

        function unloadQuestion(question) {
            sheet.find('[question-target="' + question.templateID + '"]').remove();
        }

        function updateQuestion(question) {
            var target = '[es-id="question-editor-' + question.templateID + '-label"]';
            var label = UIUtils.jq(sheet.find(target)[0]);

            label.text(question.label.ptBR.plainText);
        }
    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .controller('SheetController', SheetController);

  SheetController.$inject = [
    '$scope',
    '$element',
    'SheetContentService',
    'EditionPreviewService',
    'WorkspaceService',
    '$window',
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function SheetController($scope, $element, SheetContentService, EditionPreviewService, WorkspaceService, $window, ActivityFacadeService) {
    var self = this;
    self.EditionPreviewService = EditionPreviewService;

    SheetContentService.init($scope, $element);

    _init();

    function _init() {
      if (EditionPreviewService.isLoadingMode()) {
        EditionPreviewService.setScope($scope);
        EditionPreviewService.loadSurveyTemplate().then(function(template) {
          EditionPreviewService.isLoading = false;
          WorkspaceService.getSurvey().NavigationManager.loadJsonData(template.navigationList);
          ActivityFacadeService.createActivity(WorkspaceService.getSurvey());
        });
      } else {
        $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
      }
    }

    $scope.$on('$destroy', function cleanWorkspaceService() {
      WorkspaceService.closeWork();
      $window.sessionStorage.removeItem('surveyTemplate_OID');
    });
  }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusStage', otusStage);

    function otusStage() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'app/editor/ui/stage/stage.html'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SurveyItemWidgetFactory', SurveyItemWidgetFactory);

    SurveyItemWidgetFactory.$inject = [
        /* Question items */
        'CalendarQuestionWidgetFactory',
        'IntegerQuestionWidgetFactory',
        'DecimalQuestionWidgetFactory',
        'SingleSelectionQuestionWidgetFactory',
        'CheckboxQuestionWidgetFactory',
        'TextQuestionWidgetFactory',
        'TimeQuestionWidgetFactory',
        'EmailQuestionWidgetFactory',
        'PhoneQuestionWidgetFactory',
        /* Miscelaneous items */
        'TextItemWidgetFactory',
        'ImageItemWidgetFactory'
    ];

    function SurveyItemWidgetFactory(CalendarQuestionWidgetFactory, IntegerQuestionWidgetFactory, DecimalQuestionWidgetFactory, SingleSelectionQuestionWidgetFactory, CheckboxQuestionWidgetFactory, TextQuestionWidgetFactory, TimeQuestionWidgetFactory, EmailQuestionWidgetFactory, PhoneQuestionWidgetFactory, TextItemWidgetFactory, ImageItemWidgetFactory) {
        var self = this;

        var widgetFactories = {
            'CalendarQuestion': CalendarQuestionWidgetFactory,
            'IntegerQuestion': IntegerQuestionWidgetFactory,
            'DecimalQuestion': DecimalQuestionWidgetFactory,
            'SingleSelectionQuestion': SingleSelectionQuestionWidgetFactory,
            'CheckboxQuestion': CheckboxQuestionWidgetFactory,
            'TextQuestion': TextQuestionWidgetFactory,
            'TimeQuestion': TimeQuestionWidgetFactory,
            'EmailQuestion': EmailQuestionWidgetFactory,
            'PhoneQuestion': PhoneQuestionWidgetFactory,
            'TextItem': TextItemWidgetFactory,
            'ImageItem': ImageItemWidgetFactory
        };

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            return widgetFactories[item.objectType].create(scope, element, item);
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSurveyItemEditor', directive);

    directive.$inject = [
        'SurveyItemEditorWidgetFactory',
        'SheetContentService',
        'UUIDService',
        'PageAnchorService'
        ];

    function directive(SurveyItemEditorWidgetFactory, SheetContentService, UUIDService, PageAnchorService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item-editor/survey-item-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                scope.widget = SurveyItemEditorWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SurveyItemEditorWidgetFactory', SurveyItemEditorWidgetFactory);

    SurveyItemEditorWidgetFactory.$inject = [
        'RemoveSurveyItemEventFactory'
    ];

    function SurveyItemEditorWidgetFactory(RemoveSurveyItemEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element, item) {
            return new SurveyItemEditorWidget(scope, element, item, RemoveSurveyItemEventFactory);
        }

        return self;
    }

    function SurveyItemEditorWidget(scope, element, item, RemoveSurveyItemEventFactory) {
        var self = this;

        self.className = 'SurveyItemEditorWidget';

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getContainer = getContainer;
        self.deleteSurveyItem = deleteSurveyItem;
        self.getQuestionId = getQuestionId;

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return item;
        }

        function getQuestionId(){
            return getItem().templateID;
        }

        function getContainer() {
            if(item.isQuestion()) {
                return '<otus:question-item></otus:question-item>';
            } else {
                return '<misc-item></misc-item>';
            }
        }
        // TODO: Destroy the $scope of item
        function deleteSurveyItem() {
            RemoveSurveyItemEventFactory.create().execute(item);
            element.remove();
        }
    }

}());
(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSurveyItemPalette', directive);

    directive.$inject = ['OtusSurveyItemPaletteWidgetFactory'];

    function directive(OtusSurveyItemPaletteWidgetFactory) {
        var ddo = {
            scope: {
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/survey-item-palette/survey-item-palette.html',
            retrict: 'E',
            link: function linkFunc(scope) {
                scope.widget = OtusSurveyItemPaletteWidgetFactory.create(scope.$parent.widget);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusSurveyItemPaletteWidgetFactory', OtusSurveyItemPaletteWidgetFactory);

    OtusSurveyItemPaletteWidgetFactory.$inject = [
        'AddSurveyItemEventFactory',
    ];

    function OtusSurveyItemPaletteWidgetFactory(AddSurveyItemEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new OtusQuestionPaletteWidget(parentWidget, AddSurveyItemEventFactory);
        }

        return self;
    }

    function OtusQuestionPaletteWidget(parentWidget, AddSurveyItemEventFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;

        /* Instance definitions */
        self.parent = parentWidget;

        /* Public methods */
        self.addCalendarQuestion = addCalendarQuestion;
        self.addIntegerQuestion = addIntegerQuestion;
        self.addDecimalQuestion = addDecimalQuestion;
        self.addSingleSelectionQuestion = addSingleSelectionQuestion;
        self.addTextQuestion = addTextQuestion;
        self.addTimeQuestion = addTimeQuestion;
        self.addEmailQuestion = addEmailQuestion;
        self.addTextItem = addTextItem;
        self.addImageItem = addImageItem;
        self.addPhoneQuestion = addPhoneQuestion;
        self.addCheckboxQuestion = addCheckboxQuestion;

        /* Actions */
        function addCalendarQuestion() {
            AddSurveyItemEventFactory.create().execute('CalendarQuestion');
        }

        function addIntegerQuestion() {
            AddSurveyItemEventFactory.create().execute('IntegerQuestion');
        }

        function addDecimalQuestion() {
            AddSurveyItemEventFactory.create().execute('DecimalQuestion');
        }

        function addSingleSelectionQuestion() {
            AddSurveyItemEventFactory.create().execute('SingleSelectionQuestion');
        }

        function addTextQuestion() {
            AddSurveyItemEventFactory.create().execute('TextQuestion');
        }

        function addTimeQuestion() {
            AddSurveyItemEventFactory.create().execute('TimeQuestion');
        }

        function addEmailQuestion() {
            AddSurveyItemEventFactory.create().execute('EmailQuestion');
        }

        function addTextItem() {
            AddSurveyItemEventFactory.create().execute('TextItem');
        }

        function addImageItem() {
            AddSurveyItemEventFactory.create().execute('ImageItem');
        }

        function addPhoneQuestion() {
            AddSurveyItemEventFactory.create().execute('PhoneQuestion');
        }

        function addCheckboxQuestion() {
            AddSurveyItemEventFactory.create().execute('CheckboxQuestion');
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .component('otusSurveyTemplateHeader', {
            templateUrl: 'app/editor/ui/survey-template-header/survey-template-header-template.html',

            controller: function(WorkspaceService) {
                var self = this;

                self.name = '';
                self.acronym = '';
                self.identity = {};

                self.$onInit = function() {
                    self.identity = WorkspaceService.getSurvey().identity;
                    self.name = self.identity.name;
                    self.acronym = self.identity.acronym;
                };

            }

        });
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('TemplateLoaderService', TemplateLoaderService);

    TemplateLoaderService.$inject = [
        '$compile',
        '$templateRequest',
        '$templateCache'
    ];

    function TemplateLoaderService($compile, $templateRequest, $templateCache) {
        var self = this;

        /* Public interface */
        self.load = load;
        self.loadDirective = loadDirective;

        function load(templateUrl, scope, callback) {
            $templateRequest(templateUrl).then(function(html) {
                var compiledTemplate = compileTemplate(html, scope);
                if (callback) callback(compiledTemplate);
            });
        }

        function loadDirective(html, scope) {
            return $compile(html)(scope);
        }

        function compileTemplate(html, scope) {
            return $compile(html)(scope);
        }
    }

}());

(function() {
        'use strict';

        angular
            .module('editor.ui')
            .factory('OtusFillingRulesWidgetFactory', OtusFillingRulesWidgetFactory);

        function OtusFillingRulesWidgetFactory() {
            var self = this;

            /* Public interface */
            self.create = create;


            var validatorsTemplates = {
                alphanumeric: '<otus:alphanumeric-validator></otus:alphanumeric-validator>',
                distinct: '<otus:distinct-validator></otus:distinct-validator>',
                futureDate: '<otus:future-date-validator></otus:future-date-validator>',
                in: '<otus:in-validator></otus:in-validator>',
                lowerLimit: '<otus:lower-limit-validator></otus:lower-limit-validator>',
                lowerCase: '<otus:lower-case-validator></otus:lower-case-validator>',
                mandatory: '<otus:mandatory-validator></otus:mandatory-validator>',
                maxDate: '<otus:max-date-validator></otus:max-date-validator>',
                maxLength: '<otus:max-length-validator></otus:max-length-validator>',
                maxTime: '<otus:max-time-validator></otus:max-time-validator>',
                minDate: '<otus:min-date-validator></otus:min-date-validator>',
                minLength: '<otus:min-length-validator></otus:min-length-validator>',
                minTime: '<otus:min-time-validator></otus:min-time-validator>',
                parameter: '<otus:parameter-validator></otus:parameter-validator>',
                pastDate: '<otus:past-date-validator></otus:past-date-validator>',
                precision: '<otus:precision-validator></otus:precision-validator>',
                rangeDate: '<otus:range-date-validator></otus:range-date-validator>',
                scale: '<otus:scale-validator></otus:scale-validator>',
                specials: '<otus:specials-validator></otus:specials-validator>',
                upperCase: '<otus:upper-case-validator></otus:upper-case-validator>',
                upperLimit: '<otus:upper-limit-validator></otus:upper-limit-validator>',
                minSelected: '<otus:min-selected-validator></otus:min-selected-validator>',
                maxSelected: '<otus:max-selected-validator></otus:max-selected-validator>',
                quantity: '<otus:quantity-validator></otus:quantity-validator>'
            };

        function create(validator) {
            return validatorsTemplates[validator];
        }


        return self;

    }


}());

(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .service('SurveyLoaderService', SurveyLoaderService);

    SurveyLoaderService.$inject = ['ModelFacadeService'];

    function SurveyLoaderService(ModelFacadeService) {
        var self = this;

        /* Public interface */
        self.newSurvey = newSurvey;
        self.loadSurvey = loadSurvey;

        /* Public interface implementation */
        function newSurvey(name, acronym, version) {
            return ModelFacadeService.getSurveyFactory().create(name, acronym);
        }

        function loadSurvey(surveyTemplate) {
            return ModelFacadeService.getSurveyFactory().load(surveyTemplate);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('WorkspaceFactory', WorkspaceFactory);

    WorkspaceFactory.$inject = ['InSessionDatabaseFactory'];

    function WorkspaceFactory(InSessionDatabaseFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(workSession) {
            var inSessionDatabase = InSessionDatabaseFactory.create();
            return new Workspace(workSession, inSessionDatabase);
        }

        return self;
    }

    function Workspace(workSession, inSessionDatabase) {
        var self = this;

        /* Public interface */
        self.importProject = importProject;
        self.attachWorkeSession = attachWorkeSession;
        self.loadProjectConfiguration = loadProjectConfiguration;

        init();

        function init() {
            self.isdb = inSessionDatabase;
            self.sessions = {
                workspaceOwner: workSession
            };
        }

        function importProject(projectToImport) {
            Object.defineProperty(self, 'project', {
                value: projectToImport,
                writable: false
            });
        }

        function attachWorkeSession(workSession) {
            self.sessions[workSession.owner.username] = workSession;
        }

        function loadProjectConfiguration() {

        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .service('WorkspaceService', WorkspaceService);

    WorkspaceService.$inject = [
        'WorkspaceFactory',
        'SurveyProjectFactory',
        'SurveyLoaderService',
        'CrossSessionDatabaseService',
        'SurveyExportService'
    ];

    function WorkspaceService(WorkspaceFactory, SurveyProjectFactory, SurveyLoaderService, CrossSessionDatabaseService, SurveyExportService) {
        var self = this,
            workspace,
            questionIdCounter = -1,
            observers = [];

        /* Public interface */
        self.initializeWorkspace = initializeWorkspace;
        self.startNewWork = startNewWork;
        self.loadWork = loadWork;
        self.closeWork = closeWork;
        self.saveWork = saveWork;
        self.getQuestionId = getQuestionId;
        self.exportWork = exportWork;
        self.getSurvey = getSurvey;

        /* Observable interface */
        self.registerObserver = registerObserver;

        function initializeWorkspace(ownerWorkSession) {
            self.workspace = WorkspaceFactory.create(ownerWorkSession);
            questionIdCounter = -1;
            notifyObservers({
                type: 'NEW_PROJECT'
            });
        }

        function startNewWork(initializationData) {
            var survey = SurveyLoaderService.newSurvey(initializationData.name, initializationData.acronym.toUpperCase(), initializationData.version);
            importProject(SurveyProjectFactory.create(survey, self.workspace.sessions.workspaceOwner));
        }

        function loadWork(surveyTemplate) {
            var survey = SurveyLoaderService.loadSurvey(surveyTemplate);
            importProject(SurveyProjectFactory.create(survey, self.workspace.sessions.workspaceOwner));
        }

        function closeWork() {
            saveWork();
            self.workspace.project.close('now');
            questionIdCounter = -1;
            observers = [];
            self.workspace = undefined;
        }

        function saveWork() {
            CrossSessionDatabaseService.saveSurveyTemplateRevision(self.workspace.project.survey, self.workspace.sessions.workspaceOwner);
        }

        function exportWork() {
            return SurveyExportService.exportSurvey(self.workspace.project.survey.toJson());
        }

        function getQuestionId() {
            return ++questionIdCounter;
        }

        function getSurvey() {
            return self.workspace.project.survey;
        }

        function importProject(project) {
            self.workspace.importProject(project);
            self.workspace.loadProjectConfiguration();
        }

        /* Observable interface */
        function notifyObservers(update) {
            observers.forEach(function(observer) {
                observer.update(update);
            });
        }

        function registerObserver(observer) {
            observers.push(observer);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .directive('surveyTemplateExport', surveyTemplateExport);

    surveyTemplateExport.$inject = ['WorkspaceService'];

    function surveyTemplateExport(WorkspaceService) {
        var ddo = {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    var downloadElement = document.createElement('a');
                    downloadElement.setAttribute('href', WorkspaceService.exportWork());
                    downloadElement.setAttribute('download', 'surveyTemplate.json');
                    downloadElement.setAttribute('target', '_blank');
                    downloadElement.click();
                });
            }
        };
        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .service('SurveyExportService', SurveyExportService);


    function SurveyExportService() {
        var self = this;

        /* Public interface */
        self.exportSurvey = exportSurvey;

        function exportSurvey(JsonTemplate) {
            return 'data:text/json;charset=utf-8,' + encodeURIComponent(JsonTemplate);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('SurveyProjectFactory', SurveyProjectFactory);

    function SurveyProjectFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(survey, author) {
            return new SurveyProject(survey, author);
        }

        return self;
    }

    function SurveyProject(survey, author) {
        var self = this;

        self.configuration = {};
        var contributors = [];

        Object.defineProperty(this, 'survey', {
            value: survey,
            writable: false
        });

        Object.defineProperty(this, 'creationDateTime', {
            value: Date.now(),
            writable: false
        });

        Object.defineProperty(this, 'author', {
            value: author,
            writable: false
        });

        /* Public interface */
        self.addContributor = addContributor;
        self.removeContributor = removeContributor;
        self.listContributors = listContributors;
        self.close = close;

        function addContributor(contributor) {
            contributors.push(contributor);
        }

        function removeContributor(contributor) {
            var indexToRemove = contributors.indexOf(contributor);
            contributors = contributors.slice(indexToRemove, 1);
        }

        function listContributors() {
            return contributors;
        }

        function close(lastSaveDateTime) {
            Object.defineProperty(self, 'lastSaveDateTime', {
                value: lastSaveDateTime,
                writable: false
            });
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('EditingWorkFactory', EditingWorkFactory);

    function EditingWorkFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new EditingWork();
        }

        return self;
    }

    function EditingWork() {
        var self = this;

        self.survey = null;
        self.creationDateTime = null;
        self.author = null;
        self.contributors = null;
        self.isPublished = null;
        self.isSincronized = null;
        self.isLocallyPersisted = null;

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('EditingWorkService', EditingWorkService);

    function EditingWorkService() {
        var self = this;

        /* Public interface */
        self.startNewWork = startNewWork;
        self.loadWork = loadWork;

    }

}());

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationInspector')
    .service('otusjs.studio.navigationBuilder.navigationInspector.NavigationInspectorService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.navigationInspector.DataService',
    'otusjs.studio.navigationBuilder.navigationInspector.UiEventsService',
    'otusjs.studio.navigationBuilder.navigationInspector.ModuleEventService'
  ];

  function service(moduleScope, DataService, UiEventsService, ModuleEventService) {
    var self = this;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      deactivate();
      DataService.activate(survey);
      UiEventsService.activate();
      ModuleEventService.activate();
      moduleScope.emit(moduleScope.NBEVENTS.INSPECTOR_MODE_ON);
    }

    function deactivate() {
      moduleScope.emit(moduleScope.NBEVENTS.INSPECTOR_MODE_OFF);
      DataService.deactivate();
      ModuleEventService.deactivate();
      UiEventsService.deactivate();
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationInspector')
    .service('otusjs.studio.navigationBuilder.navigationInspector.DataService', service);

    service.$inject = [
      'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
    ];

  function service(moduleScope) {
    var self = this;
    var _survey = null;
    var _selectedNode = null;

    /* Public methods */
    // Service management
    self.activate = activate;
    self.deactivate = deactivate;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      _survey = survey;
    }

    function deactivate() {
      _survey = null;
    }

    //-----------------------------------------------------
    // Navigation inspector
    //-----------------------------------------------------

    function selectNode(node) {
      if (!_selectedNode) {
        _selectedNode = node;
        moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_SELECTED, _selectedNode);
      } else {
        moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_UNSELECTED, _selectedNode);

        if (node && node.id !== _selectedNode.id) {
          _selectedNode = node;
          moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_SELECTED, _selectedNode);
        } else {
          _selectedNode = null;
        }
      }
    }

    function selectedNode() {
      return _selectedNode;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationInspector')
    .service('otusjs.studio.navigationBuilder.navigationInspector.ModuleEventService', service);

    service.$inject = [
      'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
      'otusjs.studio.navigationBuilder.GraphLayerService',
      'otusjs.studio.navigationBuilder.messenger.InstructorService'
    ];

  function service(moduleScope, GraphLayerService, InstructorService) {
    var self = this;
    var _events = [];

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      _registerEventListener(moduleScope.NBEVENTS.INSPECTOR_MODE_ON, _onRouteModeOn);
      _registerEventListener(moduleScope.NBEVENTS.INSPECTOR_MODE_OFF, _onRouteModeOff);
      _registerEventListener(moduleScope.NBEVENTS.NAVIGATION_SELECTED, _onNavigationSelected);
      _registerEventListener(moduleScope.NBEVENTS.NAVIGATION_UNSELECTED, _onNavigationUnselected);
    }

    function deactivate() {
      _unregisterEventListeners();
    }

    function _registerEventListener(event, listener) {
      var eventReg = moduleScope.onEvent(event, listener);
      _events.push(eventReg);
    }

    function _unregisterEventListeners() {
      _events.forEach(function(eventReg) {
        eventReg();
      });
    }

    function _onRouteModeOn(event, node) {
      InstructorService.showMessenger(moduleScope.NBMESSAGES.NAVIGATION_INSPECTOR.SELECT_NAVIGATION);
    }

    function _onRouteModeOff(event, node) {
      GraphLayerService.clearVisualChanges();
      GraphLayerService.applyVisualChanges();
      InstructorService.clearMessenger();
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }

    function _onNavigationSelected(event, node) {
      GraphLayerService.lockUnrelated(node);
      GraphLayerService.showInputs(node);
      GraphLayerService.showOutputs(node);
      GraphLayerService.setNodeAsInspected(node);
      GraphLayerService.applyVisualChanges();
    }

    function _onNavigationUnselected(event, node) {
      GraphLayerService.clearVisualChanges();
      GraphLayerService.applyVisualChanges();
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationInspector')
    .service('otusjs.studio.navigationBuilder.navigationInspector.UiEventsService', service);

    service.$inject = [
      'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
      'otusjs.studio.navigationBuilder.navigationInspector.DataService',
      'otusjs.studio.navigationBuilder.GraphLayerService'
    ];

  function service(moduleScope, DataService, GraphLayerService) {
    var self = this;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      GraphLayerService.eventService.onClickNode(_selectRouteNode);
    }

    function deactivate() {
      GraphLayerService.eventService.clearAllEventListeners();
    }

    function _selectRouteNode(event) {
      DataService.selectNode(event.data.node);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMap', {
      templateUrl: 'app/navigation-builder/map/component/map-template.html',
      controller: component
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.NavigationBuilderService'
  ];

  function component(moduleScope, GraphLayerService, NavigationBuilderService) {
    var self = this;
    // var _messageLayer = null;

    /* Publi methods */
    self.$onInit = onInit;

    function onInit() {
      self.toolsCtrl = new ToolsController(NavigationBuilderService);
      moduleScope.onEvent(moduleScope.NBEVENTS.MAP_CONTAINER_READY, _renderMap);
    }

    function _renderMap() {
      var nodes = NavigationBuilderService.nodes();
      var edges = NavigationBuilderService.edges();

      GraphLayerService.initialize();
      GraphLayerService.loadData(nodes, edges);
      GraphLayerService.render();
    }
  }

  function ToolsController(NavigationBuilderService) {
    var self = this;

    _init();

    /* Public methods */
    self.click = click;
    self.addRoute = addRoute;
    self.inspect = inspect;

    function click() {
      self.isOpen = !self.isOpen;
    }

    function addRoute() {
      NavigationBuilderService.activateRouteCreatorMode();
    }

    function inspect() {
      NavigationBuilderService.activateNavigationInspectorMode();
    }

    function _init() {
      self.isOpen = false;
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.GraphLayerEventService', service);

  function service() {
    var self = this;

    var CLICK_NODE = 'clickNode';
    var OVER_NODE = 'overNode';
    var CLICK_EDGE = 'clickEdge';
    var OVER_EDGE = 'overEdge';

    var _mapView = null;
    var _clickNodeListeners = [];
    var _overNodeListeners = [];
    var _clickEdgeListeners = [];
    var _overEdgeListeners = [];

    /* Public methods */
    self.setMapView = setMapView;
    self.onClickNode = onClickNode;
    self.onOverNode = onOverNode;
    self.onClickEdge = onClickEdge;
    self.onOverEdge = onOverEdge;
    self.clearAllEventListeners = clearAllEventListeners;

    function setMapView(mapView) {
      _mapView = mapView;
      _initializeEventListeners();
    }

    function clearAllEventListeners() {
      _clickNodeListeners = [];
      _overNodeListeners = [];
      _clickEdgeListeners = [];
      _overEdgeListeners = [];
    }

    function onClickNode(listener) {
      _clickNodeListeners = [];
      _clickNodeListeners.push(listener);
    }

    function onOverNode(listener) {
      _overNodeListeners = [];
      _overNodeListeners.push(listener);
    }

    function onClickEdge(listener) {
      _clickEdgeListeners = [];
      _clickEdgeListeners.push(listener);
    }

    function onOverEdge(listener) {
      _overEdgeListeners = [];
      _overEdgeListeners.push(listener);
    }

    function _initializeEventListeners() {
      _mapView.bind(CLICK_NODE, function(event) {
        var clickedNode = event.data.node;
        if (!clickedNode.isDisabled) {
          _clickNodeListeners.forEach(function(listener) {
            listener(event);
          });
        }
      });

      _mapView.bind(OVER_NODE, function(event) {
        _overNodeListeners.forEach(function(listener) {
          listener(event);
        });
      });

      _mapView.bind(CLICK_EDGE, function(event) {
        _clickEdgeListeners.forEach(function(listener) {
          listener(event);
        });
      });

      _mapView.bind(OVER_EDGE, function(event) {
        _overEdgeListeners.forEach(function(listener) {
          listener(event);
        });
      });
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.GraphLayerFactory', factory);

  function factory() {
    var self = this;

    self.create = create;

    function create(mapViewContainer) {
      return new GraphLayer(mapViewContainer);
    }

    return self;
  }

  function GraphLayer(mapViewContainer) {
    var self = this;
    var _mapView = {};

    _loadInternalBehaviour();

    /* Public methods */
    self.mapView = mapView;
    self.loadData = loadData;
    self.render = render;
    self.updateNodeStyleBefore = updateNodeStyleBefore;
    self.updateNodeStyle = updateNodeStyle;
    self.updateNodesStyle = updateNodesStyle;
    self.updateAllNodesStyle = updateAllNodesStyle;
    self.updateAllEdgesStyle = updateAllEdgesStyle;
    self.updateOutputs = updateOutputs;
    self.updateInputs = updateInputs;

    function mapView() {
      return _mapView;
    }

    function loadData(nodes, edges) {
      _mapView.graph.clear();
      _mapView.graph.read({
        nodes: nodes,
        edges: edges
      });
    }

    function render() {
      _mapView.refresh();
    }

    function updateNodeStyleBefore(style, nodeLimiter) {
      _mapView.graph.updateNodeStyleBefore(style, nodeLimiter);
    }

    function updateNodeStyle(style, node) {
      _mapView.graph.updateNodeStyle(style, node);
    }

    function updateNodesStyle(style, node) {
      _mapView.graph.updateNodesStyle(style, node);
    }

    function updateAllNodesStyle(style) {
      _mapView.graph.updateAllNodesStyle(style);
    }

    function updateAllEdgesStyle(style) {
      _mapView.graph.updateAllEdgesStyle(style);
    }

    function updateOutputs(style, referenceNode) {
      _mapView.graph.updateOutputs(style, referenceNode);
    }

    function updateInputs(style, referenceNode) {
      _mapView.graph.updateInputs(style, referenceNode);
    }

    function _loadInternalBehaviour() {
      if (!sigma.classes.graph.hasMethod('updateNodeStyleBefore')) {
        sigma.classes.graph.addMethod('updateNodeStyleBefore', _updateNodeStyleBefore);
        sigma.classes.graph.addMethod('updateNodeStyle', _updateNodeStyle);
        sigma.classes.graph.addMethod('updateNodesStyle', _updateNodesStyle);
        sigma.classes.graph.addMethod('updateAllNodesStyle', _updateAllNodesStyle);
        sigma.classes.graph.addMethod('updateAllEdgesStyle', _updateAllEdgesStyle);
        sigma.classes.graph.addMethod('updateOutputs', _updateOutputs);
        sigma.classes.graph.addMethod('updateInputs', _updateInputs);
        sigma.classes.graph.attach('addNode', 'onAddNode', _onAddNode);
        sigma.classes.graph.attach('addEdge', 'onAddEdge', _onAddEdge);
      }
      $('#map-view').empty();
      _mapView = new sigma({
        renderer: {
          container: mapViewContainer,
          type: 'canvas'
        }
      });
    }

    function _updateNodeStyleBefore(style, nodeLimiter) {
      this.nodesArray.every(function(node) {
        if (node.id !== nodeLimiter.id) {
          node.color = style.color;
          node.isDisabled = style.isDisabled;
          return true;
        }
      });
    }

    function _updateNodeStyle(style, nodeToUpdate) {
      this.nodesArray.some(function(node) {
        if (node.id === nodeToUpdate.id) {
          node.color = style.color;
          node.isDisabled = style.isDisabled;
          return true;
        }
      });
    }

    function _updateNodesStyle(style, nodes) {
      this.nodesArray.some(function(node) {

        nodes.some(function(nodeOrigin, index, nodes) {
          if (node.id === nodeOrigin) {
            node.color = style.color;
            node.isDisabled = style.isDisabled;
            nodes.splice(index, 1);
            return true;
          }
        });

        if (!nodes.length) {
          return true;
        }
      });
    }

    function _updateAllNodesStyle(style) {
      this.nodesArray.forEach(function(node) {
        node.color = style.color;
        node.isDisabled = style.isDisabled;
      });
    }

    function _updateAllEdgesStyle(style) {
      this.edgesArray.forEach(function(edge) {
        edge.color = style.color;
      });
    }

    function _updateInputs(style, referenceNode) {
      var neighbors = this.inNeighborsIndex[referenceNode.id];
      var neighbor = null;

      for (neighbor in neighbors) {
        this.nodesArray.some(function(node) {
          if (node.id === neighbor) {
            node.color = style.color;
            return true;
          }
        });

        this.edgesArray.some(function(edge) {
          if (edge.source === neighbor && edge.target === referenceNode.id) {
            edge.color = style.color;
            return false;
          }
        });
      }
    }

    function _updateOutputs(style, referenceNode) {
      var neighbors = this.outNeighborsIndex[referenceNode.id];
      var neighbor = null;

      for (neighbor in neighbors) {
        this.nodesArray.some(function(node) {
          if (node.id === neighbor) {
            node.color = style.color;
            return true;
          }
        });
      }

      this.edgesArray.forEach(function(edge) {
        if (edge.source === referenceNode.id) {
          edge.color = style.color;
        }
      });
    }

    function _onAddNode(node) {
      if (node.isOrphan) {
        updateNodeStyle({ color: '#571616' }, node);
      }
    }

    function _onAddEdge(edge) {
      var source = this.nodesArray.filter(function(node) {
        return node.id === edge.source;
      })[0];

      var target = this.nodesArray.filter(function(node) {
        return node.id === edge.target;
      })[0];

      source.connectOut(target, edge.isDefault);
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.GraphLayerService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.GraphLayerFactory',
    'otusjs.studio.navigationBuilder.GraphLayerEventService'
  ];

  function service(GraphLayerFactory, GraphLayerEventService) {
    var self = this;
    var _graphLayer = {};

    self.eventService = GraphLayerEventService;

    /* Public methods */
    self.initialize = initialize;
    self.lockPreviousNodeOf = lockPreviousNodeOf;
    self.releasePreviousNodesOf = releasePreviousNodesOf;
    self.setNodeAsTrailhead = setNodeAsTrailhead;
    self.setNodeAsTrailend = setNodeAsTrailend;
    self.setNodeAsInspected = setNodeAsInspected;
    self.setNodesAsOrphans = setNodesAsOrphans;
    self.clearNode = clearNode;
    self.applyVisualChanges = applyVisualChanges;
    self.clearVisualChanges = clearVisualChanges;
    self.showOutputs = showOutputs;
    self.showInputs = showInputs;
    self.lockUnrelated = lockUnrelated;

    function initialize() {
      _graphLayer = GraphLayerFactory.create('map-view');

      self.loadData = function(nodes, edges) {
         var orderedNodes = [].concat(nodes);
         orderedNodes.push(orderedNodes.splice(1, 1)[0]);
         orderedNodes.map(function(node, index) {
            node.x = index;
         });
         _graphLayer.loadData(orderedNodes, edges);
      };
      self.render = _graphLayer.render;

      GraphLayerEventService.setMapView(_graphLayer.mapView());      
    }

    function lockPreviousNodeOf(node) {
      var style = { color: '#CCC', isDisabled: true };
      _graphLayer.updateNodeStyleBefore(style, node);
    }

    function releasePreviousNodesOf(node) {
      var style = { color: '#313131', isDisabled: false };
      _graphLayer.updateNodeStyleBefore(style, node);
    }

    function setNodeAsTrailhead(node) {
      var style = { color: '#3D855B' };
      _graphLayer.updateNodeStyle(style, node);
    }

    function setNodeAsInspected(node) {
      var style = { color: '#FFD22E' };
      _graphLayer.updateNodeStyle(style, node);
    }

    function setNodeAsTrailend(node) {
      var style = { color: '#1B5BD1' };
      _graphLayer.updateNodeStyle(style, node);
    }

    function setNodesAsOrphans(nodes) {
      var style = { color: '#571616' };
      _graphLayer.updateNodesStyle(style, nodes);
    }

    function clearNode(node) {
      var style = { color: '#313131', isDisabled: false };
      _graphLayer.updateNodeStyle(style, node);
    }

    function clearVisualChanges() {
      var style = { color: '#313131', isDisabled: false };
      _graphLayer.updateAllNodesStyle(style);
      _graphLayer.updateAllEdgesStyle(style);
    }

    function applyVisualChanges() {
      _graphLayer.render();
    }

    function showOutputs(node) {
      var style = { color: '#FF3232' };
      _graphLayer.updateOutputs(style, node);
    }

    function showInputs(node) {
      var style = { color: '#249C26' };
      _graphLayer.updateInputs(style, node);
    }

    function lockUnrelated(node) {
      var style = { color: '#CCC' };
      _graphLayer.updateAllNodesStyle(style);
      _graphLayer.updateAllEdgesStyle(style);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.EdgeFactory', factory);

  function factory() {
    var self = this;

    self.create = create;
    self.createForDefaultPath = createForDefaultPath;
    self.createForAlterantivePath = createForAlterantivePath;

    function create(options) {
      return new Edge(options);
    }

    function createForDefaultPath(options) {
      options.isDefault = true;
      // options.color = '#448AFF';
      return new Edge(options);
    }

    function createForAlterantivePath(options) {
      options.isDefault = false;
      // options.color = '#616161';
      if (!options.isFromOrphan) {
        options.type = 'curvedArrow';
      }
      return new Edge(options);
    }

    return self;
  }

  function Edge(options) {
    var self = this;
    self.id = options.source + '_' + options.target;
    self.source = options.source;
    self.target = options.target;
    self.color = options.color;
    self.type = options.type;
    self.isDefault = options.isDefault;
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.MapFactory', factory);

  factory.$inject = [
    'otusjs.studio.navigationBuilder.NodeFactory',
    'otusjs.studio.navigationBuilder.EdgeFactory'
  ];

  var Inject = {
    NodeFactory: {},
    EdgeFactory: {}
  };

  function factory(NodeFactory, EdgeFactory) {
    var self = this;

    Inject.NodeFactory = NodeFactory;
    Inject.EdgeFactory = EdgeFactory;

    self.create = create;

    function create(data) {
      return new Map(data);
    }

    return self;
  }

  function Map(data) {
    var self = this;
    var _nodes = [];
    var _edges = [];

    /* Public methods */
    self.addNode = addNode;
    self.addEdge = addEdge;
    self.nodes = nodes;
    self.edges = edges;
    self.createNode = createNode;
    self.createNodeForDefaultPath = createNodeForDefaultPath;
    self.createNodeForAlterantivePath = createNodeForAlterantivePath;
    self.createEdge = createEdge;
    self.createEdgeForDefaultPath = createEdgeForDefaultPath;
    self.createEdgeForAlterantivePath = createEdgeForAlterantivePath;
    self.getNavigation = getNavigation;

    function nodes(ids) {
      if (!ids) {
        return _nodes;
      } else {
        var result = [];

        _nodes.some(function(node) {

          ids.some(function(id, index) {
            if (node.id === id) {
              result.push(node);
              ids.splice(index, 1);
              return true;
            }
          });

        });

        return result;
      }
    }

    function edges() {
      return _edges;
    }

    function addNode(node) {
      if (!_nodeExists(node.id)) {
        node.x = _nodes.length;
        _nodes.push(node);
      }
    }

    function addEdge(edge) {
      if (_nodeExists(edge.source) && _nodeExists(edge.target)) {
        _edges.push(edge);
      }
    }

    function createNode(options) {
      var node = Inject.NodeFactory.create(options);
      addNode(node);
      return node;
    }

    function createNodeForDefaultPath(options) {
      var node = Inject.NodeFactory.createForDefaultPath(options);
      addNode(node);
      return node;
    }

    function createNodeForAlterantivePath(options) {
      var node = Inject.NodeFactory.createForAlterantivePath(options);
      addNode(node);
      return node;
    }

    function createEdge(options, isDefault) {
      return Inject.EdgeFactory.create(options, isDefault);
    }

    function createEdgeForDefaultPath(options) {
      var edge = Inject.EdgeFactory.createForDefaultPath(options);
      addEdge(edge);
      return edge;
    }

    function createEdgeForAlterantivePath(options) {
      var edge = Inject.EdgeFactory.createForAlterantivePath(options);
      addEdge(edge);
      return edge;
    }

    function getNavigation(node) {
      var result = _nodes.filter(function(nodeToCompare) {
        return nodeToCompare.id === node.id;
      });

      return result.length ? result[0].navigation : undefined;
    }

    function _nodeExists(nodeID) {
      var result = _nodes.filter(function(node) {
        return node.id === nodeID;
      });

      return result.length ? true : false;
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.NodeFactory', factory);

  function factory() {
    var self = this;

    self.create = create;
    self.createForDefaultPath = createForDefaultPath;
    self.createForAlterantivePath = createForAlterantivePath;

    function create(options) {
      var initialNodes = ['BEGIN NODE', 'END NODE'];
      var node;
      if (initialNodes.indexOf(options.id) > -1) {
        node = _createInitialNode(options);
      } else {
        options.color = options.isOrphan ? '#571616' : '#616161';
        node = new Node(options);
      }
      return node;
    }

    function _createInitialNode(options) {
      options.color = '#A30';
      options.y = 0;
      options.label = options.id === 'BEGIN NODE' ? 'Início' : 'Fim';
      options.isDisabled = options.id === 'BEGIN NODE' ? true : false;
      return new Node(options);
    }

    function createForDefaultPath(options) {
      options.y = 0;
      options.color = options.isOrphan ? '#571616' : '#448AFF';
      options.isDefault = true;
      return new Node(options);
    }

    function createForAlterantivePath(options) {
      options.color = options.isOrphan ? '#571616' : '#616161';
      options.isDefault = false;
      return new Node(options);
    }

    return self;
  }

  function Node(options) {
    this.defaultNextNode = null;
    this.inNeighbors = [];
    this.outNeighbors = [];

    this.isDisabled = options.isDisabled || false;
    this.index = options.index;
    this.id = options.id;
    this.label = options.label;
    this.x = options.x || 0;
    this.y = _calculateInitialY();
    this.size = options.size || '10';
    this.color = options.color || '#000';
    this.isDefault = _isDefault();
    this.isOrphan = options.isOrphan || false;

    /* Public methods */
    this.connectIn = connectIn;
    this.connectOut = connectOut;
    this.updatePosition = updatePosition;
    this.isMyDefaultNext = isMyDefaultNext;

    function connectIn(newNeighbor, isDefaultConnection) {
      this.factor = newNeighbor.outNeighbors.length;
      this.inNeighbors.push(newNeighbor);
      if (!this.isDefault) {
        this.isDefault = newNeighbor.isDefault && isDefaultConnection;
      }
      this.updatePosition(newNeighbor);
    }

    function connectOut(newNeighbor, isDefaultConnection) {
      this.outNeighbors.push(newNeighbor);

      if (isDefaultConnection) {
        this.defaultNextNode = newNeighbor;
      }

      newNeighbor.connectIn(this, isDefaultConnection);
    }

    function updatePosition(inNeighbor) {
      var defaultRouteCount = 0;
      var myDefaultParentY;

      this.inNeighbors.forEach(function(neighbor) {
        if (neighbor.isMyDefaultNext(this)) {
          if (!myDefaultParentY) {
            myDefaultParentY = neighbor.y;
          }
          ++defaultRouteCount;
        }
      }, this);

      if (options.isMyRootOrphan) {
        this.y = 1;
      } else if (this.isDefault) {
        this.y = 0;
      } else if (defaultRouteCount > 0) {
        this.y = myDefaultParentY;
      } else {
        var inCount = this.inNeighbors.length;
        this.y = ((inCount) / (!(inCount % 2) ? 1 : 2)) * (-1);
      }
    }

    function isMyDefaultNext(node) {
      return this.defaultNextNode && this.defaultNextNode.id === node.id;
    }

    function _calculateInitialY() {
      if (options.isOrphan || options.isMyRootOrphan) {
        return 1;
      } else {
        return options.y || 0;
      }
    }

    function _isDefault() {
      if (options.index === 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.messenger')
    .component('otusMessengerInstructor', {
      templateUrl: 'app/navigation-builder/messenger/instructor/instructor-template.html',
      controller: component
    });

  component.$inject = [
    '$scope',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function component($scope, scopeService) {
    var self = this;

    self.message = {};
    self.isVisible = false

    /* Component cicle methods */
    self.$onInit = onInit;

    function onInit() {
      scopeService.onEvent(scopeService.NBEVENTS.SHOW_MESSENGER, function(event, message) {
        self.isVisible = true;
        self.message = message;
      });

      scopeService.onEvent(scopeService.NBEVENTS.HIDE_MESSENGER, function(event) {
        self.isVisible = false;
      });
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.messenger')
    .service('otusjs.studio.navigationBuilder.messenger.InstructorService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function service(scopeService) {
    var self = this;

    /* Public methods */
    self.showMessenger = showMessenger;
    self.clearMessenger = clearMessenger;

    function showMessenger(message) {
      scopeService.broadcast(scopeService.NBEVENTS.SHOW_MESSENGER, message);
    }

    function clearMessenger() {
      scopeService.broadcast(scopeService.NBEVENTS.HIDE_MESSENGER);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.routeBuilder.DataService',
    'otusjs.studio.navigationBuilder.routeBuilder.ModuleEventService',
    'otusjs.studio.navigationBuilder.routeBuilder.UiEventsService'
  ];

  function service(moduleScope, DataService, ModuleEventService, UiEventsService) {
    var self = this;
    var _isNewRoute;

    /* Public methods */
    // Service management
    self.activate = activate;
    self.deactivate = deactivate;
    // Route editor
    self.createCondition = createCondition;
    self.deleteCondition = deleteCondition;
    self.isNewRoute = isNewRoute;
    self.saveRouteBuilding = saveRouteBuilding;
    self.selectCondition = selectCondition;
    self.selectedCondition = selectedCondition;
    self.selectedRoute = selectedRoute;
    self.startRouteBuilding = startRouteBuilding;
    self.cancelRouteBuilding = cancelRouteBuilding;
    self.deleteRoute = deleteRoute;
    // Rule editor
    self.createRule = createRule;
    self.deleteRule = deleteRule;
    self.getAnswerListForRule = getAnswerListForRule;
    self.getOperatorListForRule = getOperatorListForRule;
    self.getWhenListForRule = getWhenListForRule;
    self.updateRule = updateRule;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      DataService.activate(survey);
      UiEventsService.activate();
      ModuleEventService.activate();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_ON);
    }

    function deactivate() {
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_OFF);
      DataService.deactivate();
      ModuleEventService.deactivate();
      UiEventsService.deactivate();
    }

    //-----------------------------------------------------
    // Route editor
    //-----------------------------------------------------

    function createCondition() {
      DataService.createCondition();
    }

    function isNewRoute() {
      return _isNewRoute;
    }

    function deleteCondition(index) {
      DataService.deleteCondition(index);
    }

    function saveRouteBuilding() {
      DataService.apply();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_BUILD_SAVED);
    }

    function deleteRoute() {
      DataService.deleteRoute();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_DELETED);
    }

    function selectCondition(index) {
      DataService.selectCondition(index);
    }

    function selectedCondition() {
      return DataService.selectedCondition();
    }

    function selectedRoute() {
      return DataService.selectedRoute();
    }

    function startRouteBuilding(origin, destination) {
      if (DataService.routeExists(origin, destination)) {
        DataService.useCurrentRouteData();
        _isNewRoute = false;
      } else {
        DataService.initializeRouteData();
        DataService.createCondition();
        _isNewRoute = true;
      }
      DataService.selectCondition(0);
    }

    function cancelRouteBuilding() {
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_BUILD_CANCELED);
    }

    //-----------------------------------------------------
    // Rule editor
    //-----------------------------------------------------

    function createRule(when, operator, answer, isCustom) {
      if (when.type == 'CheckboxQuestion' && answer instanceof Object && !answer.isMetadata) {
        isCustom = true;
        answer = answer.option.customOptionID;
        DataService.createRule(when, operator, answer, isCustom);
      } else {
        DataService.createRule(when, operator, answer, isCustom);
      }
    }

    function deleteRule(ruleIndex) {
      DataService.deleteRule(ruleIndex);
    }

    function getAnswerListForRule(question) {
      return DataService.listAvailableAnswer(question);
    }

    function getOperatorListForRule(itemType) {
      return DataService.listAvailableOperator(itemType);
    }

    function getWhenListForRule() {
      return DataService.listAvailableWhen();
    }

    function updateRule(ruleIndex, when, operator, answer, isCustom) {
      DataService.updateRule(ruleIndex, when, operator, answer, isCustom);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.DataService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleWhenBuilderService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleOperatorBuilderService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService'
  ];

  function service(moduleScope, RuleWhenBuilderService, RuleOperatorBuilderService, RuleAnswerBuilderService) {
    var self = this;
    var _survey = null;
    var _originNode = null;
    var _destinationNode = null;
    var _routeData = null;
    var _selectedNavigation = null;
    var _selectedCondition = null;

    /* Public methods */
    // Service management
    self.activate = activate;
    self.deactivate = deactivate;
    // Map interactions
    self.hasDestinationNode = hasDestinationNode;
    self.hasOriginNode = hasOriginNode;
    self.selectNode = selectNode;
    self.selectedEdges = selectedEdges;
    self.selectedNode = selectedNode;
    // Route editor
    self.apply = apply;
    self.createCondition = createCondition;
    self.deleteCondition = deleteCondition;
    self.deleteRoute = deleteRoute;
    self.initializeRouteData = initializeRouteData;
    self.isSimpleNavigation = isSimpleNavigation;
    self.routeExists = routeExists;
    self.selectCondition = selectCondition;
    self.selectRoute = selectRoute;
    self.selectedCondition = selectedCondition;
    self.selectedRoute = selectedRoute;
    self.useCurrentRouteData = useCurrentRouteData;
    // Rule editor
    self.createRule = createRule;
    self.deleteRule = deleteRule;
    self.listAvailableAnswer = listAvailableAnswer;
    self.listAvailableOperator = listAvailableOperator;
    self.listAvailableWhen = listAvailableWhen;
    self.updateRule = updateRule;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      _survey = survey;
      window.survey = _survey;
    }

    function deactivate() {
      _survey = null;
      _originNode = null;
      _destinationNode = null;
      _routeData = null;
      _selectedNavigation = null;
      _selectedCondition = null;
    }

    //-----------------------------------------------------
    // Map interactions
    //-----------------------------------------------------

    function hasDestinationNode() {
      return _nodeExists(_destinationNode);
    }

    function hasOriginNode() {
      return _nodeExists(_originNode);
    }

    function selectNode(node) {
      if (_areSameNode(_originNode, node)) {
        _originNode = null;
        moduleScope.emit(moduleScope.NBEVENTS.ORIGIN_NODE_UNSELECTED, node);
      } else if (_areSameNode(_destinationNode, node)) {
        _destinationNode = null;
        moduleScope.emit(moduleScope.NBEVENTS.DESTINATION_NODE_UNSELECTED, node);
      } else if (!hasOriginNode()) {
        _originNode = node;
        moduleScope.emit(moduleScope.NBEVENTS.ORIGIN_NODE_SELECTED, node);
      } else {
        _destinationNode = node;
        moduleScope.emit(moduleScope.NBEVENTS.DESTINATION_NODE_SELECTED, selectedNode());
      }
    }

    // TODO: implementar
    function selectedEdges() {
      return null;
    }

    function selectedNode() {
      return [_originNode, _destinationNode];
    }

    function _areSameNode(originalNode, nodeToCompare) {
      if (_nodeExists(originalNode) && (originalNode.id === nodeToCompare.id)) {
        return true;
      } else {
        return false;
      }
    }

    function _nodeExists(node) {
      if (!node) {
        return false;
      } else {
        return true;
      }
    }

    //-----------------------------------------------------
    // Route editor
    //-----------------------------------------------------

    function apply() {
      _survey.NavigationManager.selectNavigationByOrigin(_originNode.id);
      _survey.NavigationManager.applyRoute(_routeData);
    }

    function createCondition() {
      var newConditionData = {};
      newConditionData.name = 'ROUTE_CONDITION' + '_' + _routeData.conditions.length;
      newConditionData.rules = [];
      _routeData.conditions.push(newConditionData);
    }

    function deleteCondition(index) {
      _routeData.conditions.splice(index, 1);
      selectCondition(0);
    }

    function deleteRoute() {
      _survey.NavigationManager.selectNavigationByOrigin(_originNode.id);
      _survey.NavigationManager.deleteRoute(_routeData);
    }

    function initializeRouteData() {
      selectNavigation(_originNode.id);
      _routeData = {};
      _routeData.origin = _originNode.id;
      _routeData.destination = _destinationNode.id;
      _routeData.conditions = [];
    }

    function selectCondition(index) {
      if (_routeData.conditions.length) {
        _selectedCondition = _routeData.conditions[index];
      } else {
        return false;
      }
    }

    function selectRoute() {
      return _routeData;
    }

    function selectedCondition() {
      return _selectedCondition;
    }

    function selectedRoute() {
      return _routeData;
    }

    function isSimpleNavigation(origin) {
      if (selectNavigation(origin).listRoutes().length === 1) {
        return true;
      } else {
        return false;
      }
    }

    function selectNavigation(origin) {
      _selectedNavigation = _survey.NavigationManager.selectNavigationByOrigin(origin);
      return _selectedNavigation;
    }

    function routeExists(origin, destination) {
      selectNavigation(origin.id);
      var routeData = {};
      routeData.origin = origin.id;
      routeData.destination = destination.id;
      return _selectedNavigation.hasRoute(routeData);
    }

    function useCurrentRouteData() {
      selectNavigation(_originNode.id);
      var routeQuery = {
        name: _originNode.id + '_' + _destinationNode.id
      };
      _routeData = _selectedNavigation.getRouteByName(routeQuery.name).toJson();
      _routeData = JSON.parse(_routeData);
    }

    //-----------------------------------------------------
    // Rule editor
    //-----------------------------------------------------

    function createRule(when, operator, answer, isCustom) {
      var ruleData = {};
      ruleData.when = when;
      ruleData.isMetadata = answer.isMetadata || false;
      ruleData.operator = operator;
      ruleData.isCustom = isCustom;
      if (isCustom) {
        ruleData.answer = answer;
      } else {
        ruleData.answer = answer.option.value ;
      }
      _selectedCondition.rules.push(ruleData);
    }

    function deleteRule(ruleIndex) {
      _selectedCondition.rules.splice(ruleIndex, 1);
    }

    function listAvailableAnswer(item) {
      return RuleAnswerBuilderService.build(item);
    }

    function listAvailableOperator(itemType) {
      return RuleOperatorBuilderService.build(itemType);
    }

    function listAvailableWhen() {
      var itemList = _survey.NavigationManager.getAvaiableRuleCriterionTargets(_originNode.id);
      return itemList.map(RuleWhenBuilderService.build);
    }

    function updateRule(ruleIndex, when, operator, answer, isCustom) {
      var ruleData = _selectedCondition.rules[ruleIndex];
      ruleData.when = when;
      ruleData.operator = operator;
      if (isCustom || typeof answer === 'string') {
        ruleData.answer = answer;
        ruleData.isMetadata = false;
        ruleData.isCustom = true;
      } else {
        ruleData.answer = answer.option.value ;
        ruleData.isMetadata = answer.isMetadata;
        ruleData.isCustom = false;
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.MessageService', service);

  function service() {
    var self = this;

    // self.setScope = setScope;
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.ModuleEventService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.messenger.InstructorService',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService'
  ];

  function service(moduleScope, GraphLayerService, InstructorService, RouteDialogService) {
    var self = this;
    var _events = [];

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_MODE_ON, _onRouteModeOn);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_MODE_OFF, _onRouteModeOff);
      _registerEventListener(moduleScope.NBEVENTS.ORIGIN_NODE_SELECTED, _onOriginNodeSelected);
      _registerEventListener(moduleScope.NBEVENTS.ORIGIN_NODE_UNSELECTED, _onOriginNodeUnselected);
      _registerEventListener(moduleScope.NBEVENTS.DESTINATION_NODE_SELECTED, _onDestinationNodeSelected);
      _registerEventListener(moduleScope.NBEVENTS.DESTINATION_NODE_UNSELECTED, _onDestinationNodeUnselected);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_DELETED, _onRouteDeleted);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_BUILD_SAVED, _onRouteBuildSaved);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_BUILD_CANCELED, _onRouteBuildCanceled);
    }

    function deactivate() {
      _unregisterEventListeners();
    }

    function _registerEventListener(event, listener) {
      var eventReg = moduleScope.onEvent(event, listener);
      _events.push(eventReg);
    }

    function _unregisterEventListeners() {
      _events.forEach(function(eventReg) {
        eventReg();
      });
    }

    function _onRouteModeOn(event, node) {
      InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
    }

    function _onRouteModeOff(event, node) {
      GraphLayerService.clearVisualChanges();
      GraphLayerService.applyVisualChanges();
      InstructorService.clearMessenger();
      deactivate();
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }

    function _onOriginNodeSelected(event, node) {
      GraphLayerService.lockPreviousNodeOf(node);
      GraphLayerService.setNodeAsTrailhead(node);
      GraphLayerService.applyVisualChanges();
      InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
      moduleScope.apply();
    }

    function _onOriginNodeUnselected(event, node) {
      GraphLayerService.releasePreviousNodesOf(node);
      GraphLayerService.clearNode(node);
      GraphLayerService.applyVisualChanges();
      InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
      moduleScope.apply();
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }

    function _onDestinationNodeSelected(event, node) {
      GraphLayerService.setNodeAsTrailend(node);
      GraphLayerService.applyVisualChanges();
      InstructorService.clearMessenger();
      RouteDialogService.showDialog(node[0], node[1]);
    }

    function _onDestinationNodeUnselected(event, node) {
      GraphLayerService.clearNode(node);
      GraphLayerService.applyVisualChanges();
      InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }

    function _onRouteDeleted(event) {
      RouteDialogService.closeDialog();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_OFF);
      moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_UPDATED);
    }

    function _onRouteBuildSaved(event) {
      RouteDialogService.closeDialog();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_OFF);
      moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_UPDATED);
    }

    function _onRouteBuildCanceled(event) {
      RouteDialogService.closeDialog();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_OFF);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService', service);

  function service() {
    var self = this;

    /* Public methods */
    self.build = build;
    self.buildCustomAnswer = buildCustomAnswer;

    function build(item) {
      var answers = [];

      if (item.objectType !== 'SingleSelectionQuestion' && item.objectType !== 'CheckboxQuestion') {
        answers = answers.concat(_getCustomAnswer());
      } else if (item.options) {
        answers = answers.concat(item.options.map(getAnswerOption));
      } else if (item.options) {
        answers = answers.concat(item.options.map(getAnswerOption));
      }

      if (item.metadata && item.metadata.options) {
        answers = answers.concat(item.metadata.options.map(getMetadataOption));
      }
      return answers;
    }

    function _getCustomAnswer() {
      return [{
        isMetadata: false,
        option: {
          label: {
            ptBR: {
              plainText: ''
            },
            value: null
          }
        }
      }];
    }

    function buildCustomAnswer(when, ruleData, answerList) {
      if (when.type === 'CalendarQuestion') {
        var date = new Date(ruleData.answer);
        var answer = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
      } else if (when.type === 'CheckboxQuestion') {
        return _filterAnswerCheckboxQuestion(ruleData, answerList);
      }

      return {
        isMetadata: false,
        option: {
          label: {
            ptBR: {
              plainText: ruleData.answer
            },
            value: null
          }
        }
      };
    }

    function _filterAnswerCheckboxQuestion(ruleData, answerList) {
      var resultFilter = answerList.filter(function(element) {
        if (element.option.customOptionID == ruleData.answer) {
          return element;
        }
      });

      return {
        isMetadata: false,
        option: {
          label: {
            ptBR: {
              plainText: resultFilter.length > 0 ? resultFilter[0].option.label.ptBR.plainText : ruleData.answer
            },
            value: null
          }
        }
      };
    }

    function getAnswerOption(option) {
      return {
        isMetadata: false,
        option: option
      }
    }

    function getMetadataOption(option) {
      return {
        isMetadata: true,
        option: option
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.RuleDataFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.createNew = createNew;
    self.createFromRuleModel = createFromRuleModel;

    function createNew() {
      return new RuleData();
    }

    function createFromRuleModel() {
      return new RuleData();
    }

    return self;
  }

  function RuleData() {
    var self = this;
  }
}());

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleOperatorBuilderService', service);

  function service() {
    var self = this;
    var _operatorMap = {};

    _initOperatorMap();

    /* Public methods */
    self.build = build;

    function build(itemType) {
      if (_isTextItem(itemType)) {
        return _operatorMap.text;
      } else if (_isNumberItem(itemType)) {
        return _operatorMap.number;
      } else if (_isDateItem(itemType)) {
        return _operatorMap.date;
      } else if (_isTimeItem(itemType)) {
        return _operatorMap.time;
      } else if (_isSingleChoiceItem(itemType)) {
        return _operatorMap.singleChoice;
      } else if (_isMultipleChoiceItem(itemType)) {
        return _operatorMap.multipleChoice;
      } else {
        return [];
      }
    }

    function _isTextItem(itemType) {
      return (itemType === 'TextQuestion' || itemType === 'EmailQuestion' || itemType === 'PhoneQuestion');
    }

    function _isNumberItem(itemType) {
      return (itemType === 'IntegerQuestion' || itemType === 'DecimalQuestion');
    }

    function _isDateItem(itemType) {
      return (itemType === 'CalendarQuestion');
    }

    function _isTimeItem(itemType) {
      return (itemType === 'TimeQuestion');
    }

    function _isSingleChoiceItem(itemType) {
      return (itemType === 'SingleSelectionQuestion');
    }

    function _isMultipleChoiceItem(itemType) {
      return (itemType === 'CheckboxQuestion');
    }

    function _initOperatorMap() {
      _operatorMap = {};

      var _notEqual = {}
      _notEqual.type = 'notEqual';
      _notEqual.label = {};
      _notEqual.label.ptBR = {};
      _notEqual.label.ptBR.plainText = 'Diferente de';

      var _equal = {};
      _equal.type = 'equal';
      _equal.label = {};
      _equal.label.ptBR = {};
      _equal.label.ptBR.plainText = 'Igual a';

      var _contains = {};
      _contains.type = 'contains';
      _contains.label = {};
      _contains.label.ptBR = {};
      _contains.label.ptBR.plainText = 'Contém';

      var _in = {};
      _in.type = 'in';
      _in.label = {};
      _in.label.ptBR = {};
      _in.label.ptBR.plainText = 'Está dentro do intervalo';

      var _between = {};
      _between.type = 'between';
      _between.label = {};
      _between.label.ptBR = {};
      _between.label.ptBR.plainText = 'Está entre os valores';

      var _greater = {};
      _greater.type = 'greater';
      _greater.label = {};
      _greater.label.ptBR = {};
      _greater.label.ptBR.plainText = 'É maior que';

      var _greaterEqual = {};
      _greaterEqual.type = 'greaterEqual';
      _greaterEqual.label = {};
      _greaterEqual.label.ptBR = {};
      _greaterEqual.label.ptBR.plainText = 'É maior ou igual a';

      var _lower = {};
      _lower.type = 'lower';
      _lower.label = {};
      _lower.label.ptBR = {};
      _lower.label.ptBR.plainText = 'É menor que';

      var _lowerEqual = {};
      _lowerEqual.type = 'lowerEqual';
      _lowerEqual.label = {};
      _lowerEqual.label.ptBR = {};
      _lowerEqual.label.ptBR.plainText = 'É menor ou igual a';

      var _quantity = {};
      _quantity.type = 'quantity';
      _quantity.label = {};
      _quantity.label.ptBR = {};
      _quantity.label.ptBR.plainText = 'Quantidade selecionada igual a';

      var _minSelected = {};
      _minSelected.type = 'minSelected';
      _minSelected.label = {};
      _minSelected.label.ptBR = {};
      _minSelected.label.ptBR.plainText = 'Quantidade mínima selecionada de';

      var _maxSelected = {};
      _maxSelected.type = 'maxSelected';
      _maxSelected.label = {};
      _maxSelected.label.ptBR = {};
      _maxSelected.label.ptBR.plainText = 'Quantidade máxima selecionada de';

      // Single choice operators
      _operatorMap.singleChoice = [_notEqual, _equal];

      // Text operators
      _operatorMap.text = Array.prototype.concat(_operatorMap.singleChoice, [_contains]);

      // Number operators
      _operatorMap.number = Array.prototype.concat(_operatorMap.singleChoice, [_in, _between, _greater, _greaterEqual, _lower, _lowerEqual]);

      // Date operators
      _operatorMap.date = _operatorMap.number;

      // Time operators
      _operatorMap.time = _operatorMap.date;

      // Multiple choice operators
      _operatorMap.multipleChoice = Array.prototype.concat(_operatorMap.text, [_quantity, _minSelected, _maxSelected]);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleWhenBuilderService', service);

  function service() {
    var self = this;
    var _mapping = {};

    /* Public methods */
    self.build = build;

    _initializeIconList();

    function build(item) {
      var builded = {};

      builded.type = item.objectType;
      builded.icon = _mapping[item.objectType];
      builded.customID = item.customID;
      builded.label = item.label;
      builded.item = item;

      return builded;
    }

    function _initializeIconList() {
      _mapping.CalendarQuestion = {};
      _mapping.CalendarQuestion.image = 'date_range';
      _mapping.CalendarQuestion.tooltip = 'Data';

      _mapping.IntegerQuestion = {};
      _mapping.IntegerQuestion.image = 'looks_one';
      _mapping.IntegerQuestion.tooltip = 'Número Inteiro';

      _mapping.DecimalQuestion = {};
      _mapping.DecimalQuestion.image = 'exposure_zero';
      _mapping.DecimalQuestion.tooltip = 'Número Decimal';

      _mapping.SingleSelectionQuestion = {};
      _mapping.SingleSelectionQuestion.image = 'radio_button_checked';
      _mapping.SingleSelectionQuestion.tooltip = 'Seleção Única';

      _mapping.CheckboxQuestion = {};
      _mapping.CheckboxQuestion.image = 'check_box';
      _mapping.CheckboxQuestion.tooltip = 'Checkbox';

      _mapping.TextQuestion = {};
      _mapping.TextQuestion.image = 'text_format';
      _mapping.TextQuestion.tooltip = 'Texto';

      _mapping.EmailQuestion = {};
      _mapping.EmailQuestion.image = 'email';
      _mapping.EmailQuestion.tooltip = 'Email';

      _mapping.TimeQuestion = {};
      _mapping.TimeQuestion.image = 'access_time';
      _mapping.TimeQuestion.tooltip = 'Hora';

      _mapping.PhoneQuestion = {};
      _mapping.PhoneQuestion.image = 'phone';
      _mapping.PhoneQuestion.tooltip = 'Telefone';

      _mapping.TextItem = {};
      _mapping.TextItem.image = 'message';
      _mapping.TextItem.tooltip = 'Texto';

      _mapping.ImageItem = {};
      _mapping.ImageItem.image = 'image';
      _mapping.ImageItem.tooltip = 'Imagem';
    }
 }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.UiEventsService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.routeBuilder.DataService'
  ];

  function service(moduleScope, GraphLayerService, DataService) {
    var self = this;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      GraphLayerService.eventService.onClickNode(_selectNode);
      GraphLayerService.eventService.onOverNode(_focusNode);
      GraphLayerService.eventService.onClickEdge(_selectRoute);
      GraphLayerService.eventService.onOverEdge(_focusEdge);
    }

    function deactivate() {
      GraphLayerService.eventService.clearAllEventListeners();
    }

    function _selectNode(event) {
      DataService.selectNode(event.data.node);
    }

    function _focusNode(event) {
    }

    function _selectRoute(event) {
      var map = moduleScope.get('map');
      var node = map.nodes([event.data.edge.source]);
      var originNode = event.data.edge.source;
      DataService.selectNode();
    }

    function _focusEdge(event) {
      console.log(event.data.edge);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService', service);

  service.$inject = [
    '$mdDialog',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function service($mdDialog, moduleScope) {
    var self = this;
    var _dialogSettings = {};

    /* Public interface */
    self.showDialog = showDialog;
    self.closeDialog = closeDialog;

    _init();

    function _init() {
      _setupDialogConfiguration();
    }

    function showDialog(originNode, destinationNode) {
      _dialogSettings.locals = {
        origin: originNode,
        destination: destinationNode,
        moduleScope: moduleScope
      };
      $mdDialog.show(_dialogSettings);
    }

    function closeDialog() {
      $mdDialog.hide();
    }

    function _setupDialogConfiguration() {
      _dialogSettings.templateUrl = 'app/navigation-builder/route/dialog/route-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = false;
      _dialogSettings.fullscreen = true;
      _dialogSettings.hasBackdrop = true;
    }
  }

  function DialogController($mdDialog, origin, destination, moduleScope) {
    var self = this;

    self.origin = origin;
    self.destination = destination;

    /* Public interface */
    self.cancel = cancel;
    self.confirm = confirm;

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function confirm(response) {
      $mdDialog.hide(response);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .component('otusRouteEditor', {
      templateUrl: 'app/navigation-builder/route/editor/route-editor.html',
      controller: component,
      bindings: {
        originNode: '<',
        destinationNode: '<',
        onConfirm: '&'
      }
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService'
  ];

  function component(RouteBuilderService) {
    var self = this;
    var _childs = {};

    self.selectedRoute = [];
    self.conditions = [];

    /* Public methods */
    self.$onInit = onInit;
    self.cancel = cancel;
    self.save = save;
    self.deleteRoute = deleteRoute;
    self.createCondition = createCondition;
    self.selectCondition = selectCondition;
    self.deleteCondition = deleteCondition;
    self.readyToSave = readyToSave;
    self.childRules = childRules;

    function onInit() {
      _childs = {};
      _initializeLabels();
      RouteBuilderService.startRouteBuilding(self.originNode, self.destinationNode);
      self.isNewRoute = RouteBuilderService.isNewRoute();
      self.selectedRoute = RouteBuilderService.selectedRoute();
      self.conditions = RouteBuilderService.selectedRoute().conditions;

      self.conditions.forEach(function(condition) {
        _childs[condition.name] = [];
      });

      readyToSave();
    }

    function cancel() {
      RouteBuilderService.cancelRouteBuilding();
    }

    function save() {
      RouteBuilderService.saveRouteBuilding();
    }

    function deleteRoute() {
      RouteBuilderService.deleteRoute();
    }

    function createCondition() {
      RouteBuilderService.createCondition();
      _childs[self.conditions[self.conditions.length - 1].name] = [];
    }

    function deleteCondition(index, condition) {
      delete _childs[condition.name];
      RouteBuilderService.deleteCondition(index);
    }

    function selectCondition(index) {
      RouteBuilderService.selectCondition(index);
    }

    function readyToSave() {
      if (self.selectedRoute.isDefault) {
        return true;
      } else {
        if (!self.selectedRoute.conditions.length) {
          createCondition();
        }
        return self.selectedRoute.conditions.every(function(condition) {
          return condition.rules.length > 0;
        });
      }
    }

    function _initializeLabels() {
      self.label = {
        dialog: {
          title: 'Criar nova Rota'
        },
        button: {
          cancel: 'Cancelar',
          save: 'Salvar Rota',
          createCondition: 'Criar condição de rota',
          deleteRoute: 'Exluir esta rota'
        },
        origin: 'Origem',
        destination: 'Destino',
        originNode: self.originNode.label,
        destinationNode: self.destinationNode.label,
        conditionTitle: 'Regras de condição',
        isDefaultRoute: 'Rota padrão',
        message: {
          emptyConditions: 'Você ainda não criou condições de rota. Clicando em CRIAR CONDIÇÃO DE ROTA.',
        }
      };
    }

    function childRules(condition) {
      return _childs[condition.name];
    }

    self.deleteRule = function(ruleEditor) {
      var condition = RouteBuilderService.selectedCondition();
      var editorToDelete = _childs[condition.name].indexOf(ruleEditor);

      condition.rules.forEach(function(rule, index) {
        _childs[condition.name][index].ruleData.index = index;
      });

      RouteBuilderService.deleteRule(ruleEditor.ruleData.index);
      _childs[condition.name].splice(ruleEditor.ruleData.index, 1);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .component('otusRuleCreator', {
      templateUrl: 'app/navigation-builder/route/editor/rule-creator-template.html',
      controller: component,
      bindings: {
        condition: '<',
        conditionIndex: '<'
      }
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService'
  ];

  function component(RouteBuilderService, RuleAnswerBuilderService) {
    var self = this;
    var isCustomAnswer;

    /* Public methods */
    self.$onInit = onInit;
    self.answers = answers;
    self.answerChange = answerChange;
    self.answerInputChange = answerInputChange;
    self.operatorChange = operatorChange;
    self.whens = whens;
    self.whenChange = whenChange;
    self.saveRule = saveRule;

    function onInit() {
      _initializeWhenList();

      self.isDisable = true;
      self.isAnswerDisable = true;
      self.showSaveRuleButton = true;
      self.readyToSave = _readyToSave();
    }

    function answers(filterValue) {
      if (!filterValue) {
        return self.answerList.filter(_filter);
      } else {
        var filterResult = self.answerList.filter(function(answer) {
          return answer.option.label.ptBR.plainText.search(filterValue) != -1 || self.selectedWhen.customID.search(filterValue) != -1;
        });
        return filterResult.filter(_filter);
      }
    }

    function _filter(element, index) {
      if (self.selectedWhen.type == 'SingleSelectionQuestion' || self.selectedWhen.type == 'CheckboxQuestion') {
        return true;
      } else {
        return index > 0;
      }
    }

    function answerInputChange() {
      if (self.answerSearchText) {
        if (self.selectedWhen.type == 'SingleSelectionQuestion') {
          isCustomAnswer = false;
          self.readyToSave = false;
        } else {
          isCustomAnswer = true;
          self.selectedAnswer = self.answerSearchText;
          self.readyToSave = _readyToSave();
        }
      }
    }

    function answerChange(answer) {
      if (!isCustomAnswer) {
        isCustomAnswer = false;
        self.selectedAnswer = answer;
      }
      self.readyToSave = _readyToSave();
    }

    function _createAnswerItem(answerData) {
      return {
        value: answerData.value,
        label: answerData.label.ptBR.plainText,
        option: answerData
      };
    }

    function whens(filterValue) {
      if (!filterValue) {
        return self.whenList;
      } else {
        var filterResult = self.whenList.filter(function(when) {
          return when.label.ptBR.plainText.search(filterValue) != -1 || when.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    function whenChange(when) {
      self.selectedWhen = when;

      self.operatorList = [];
      self.answerList = [];

      if (self.selectedWhen) {
        self.operatorList = _returnFilteredOperatorList(self.selectedWhen.type);
        self.answerList = RouteBuilderService.getAnswerListForRule(self.selectedWhen.item);
        self.isDisable = false;
      } else {
        self.isDisable = true;
      }

      self.readyToSave = _readyToSave();
    }

    //TODO: Quando implementado recurso dos operadores retirados, esse método deve ser removido!
    function _returnFilteredOperatorList(when) {
      var list = RouteBuilderService.getOperatorListForRule(when).filter(function(element, index) {
        if (element.label.ptBR.plainText !== 'Intervalo de valores' && element.label.ptBR.plainText !== 'Está dentro do intervalo' && element.label.ptBR.plainText !== 'Está entre os valores') {
          return true;
        }
      });
      return list;
    }

    function _initializeWhenList() {
      self.whenList = [];
      self.whenList = RouteBuilderService.getWhenListForRule();
    }

    function operatorChange(operator) {
      self.selectedOperator = operator;
      self.readyToSave = _readyToSave();
    }

    function saveRule() {
      RouteBuilderService.selectCondition(self.conditionIndex);
      if (_readyToSave()) {
        RouteBuilderService.createRule(self.selectedWhen, self.selectedOperator, self.selectedAnswer, isCustomAnswer);
      }
      isCustomAnswer = false;
      self.whenSearchText = '';
      self.operatorSearchText = '';
      self.answerSearchText = '';
    }

    function _readyToSave() {
      if (_resolveRuleWhen() && _resolveRuleOperator() && _resolveRuleAnswer()) {
        return true;
      } else {
        return false;
      }
    }

    function _resolveRuleWhen() {
      if (!self.selectedWhen) {
        return false;
      } else {
        return true;
      }
    }

    function _resolveRuleOperator() {
      if (!self.selectedOperator) {
        return false;
      } else {
        return true;
      }
    }

    function _resolveRuleAnswer() {
      if (isCustomAnswer || self.selectedAnswer) {
        return true;
      } else {
        return false;
      }
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .component('otusRuleEditor', {
      templateUrl: 'app/navigation-builder/route/editor/rule-editor-template.html',
      controller: component,
      bindings: {
        ruleData: '<',
        condition: '<',
        conditionIndex: '<',
        onUpdate: '&'
      },
      require: {
        otusRouteEditor: '^otusRouteEditor'
      }
    });

  component.$inject = [
    '$element',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService'
  ];

  function component($element, RouteBuilderService, RuleAnswerBuilderService) {
    var self = this;
    var _isCustomAnswer;

    /* Public methods */
    self.$onInit = onInit;
    self.answers = answers;
    self.answerChange = answerChange;
    self.answerInputChange = answerInputChange;
    self.operatorChange = operatorChange;
    self.whens = whens;
    self.whenChange = whenChange;
    self.updateRule = updateRule;
    self.deleteRule = deleteRule;

    function onInit() {
      self.isDisable = false;
      self.isAnswerDisable = false;
      self.showDeleteRuleButton = true;

      _initializeWhenList();
      _applyRuleDataWhen();
      _applyRuleDataOperator();
      _applyRuleDataAnswer();

      self.$element = $element;
      self.ruleData.index = self.otusRouteEditor.childRules(self.condition).length;
      self.otusRouteEditor.childRules(self.condition).push(self);
    }

    function _applyRuleDataWhen() {
      var customID = self.ruleData.when.customID || self.ruleData.when;
      self.whenList.some(function(when) {
        if (when.customID === customID) {
          self.selectedWhen = when;
          return true;
        }
      });
    }

    function _applyRuleDataOperator() {
      self.operatorList = RouteBuilderService.getOperatorListForRule(self.selectedWhen.type);
      var type = self.ruleData.operator.type || self.ruleData.operator;
      self.operatorList.some(function(operator) {
        if (operator.type === type) {
          self.selectedOperator = operator;
          return true;
        }
      });
    }

    function _applyRuleDataAnswer() {
      self.answerList = RouteBuilderService.getAnswerListForRule(self.selectedWhen.item);
      if (self.ruleData.isCustom) {
        self.selectedAnswer = RuleAnswerBuilderService.buildCustomAnswer(self.selectedWhen, self.ruleData, self.answerList);
      } else {
        self.selectedAnswer = self.answerList.filter(function(answer) {
          return (answer.option.value === self.ruleData.answer) && (answer.isMetadata === self.ruleData.isMetadata);
        })[0];
      }
    }

    function answers(filterValue) {
      if (!filterValue) {
        return self.answerList.filter(_filter);
      } else {
        var filterResult = self.answerList.filter(function(answer) {
          return answer.option.label.ptBR.plainText.search(filterValue) != -1 || self.selectedWhen.customID.search(filterValue) != -1;
        });
        return filterResult.filter(_filter);
      }
    }

    function _filter(element, index) {
      if (self.selectedWhen) {
        if (self.selectedWhen.type == 'SingleSelectionQuestion' || self.selectedWhen.type == 'CheckboxQuestion') {
          return true;
        } else {
          return index > 0;
        }
      }
    }

    function answerInputChange() {
      if (self.answerSearchText) {
        if (self.selectedWhen.type == 'SingleSelectionQuestion') {
          _isCustomAnswer = false;
          self.readyToSave = false;
        } else {
          _isCustomAnswer = true;
          self.selectedAnswer = self.answerSearchText;
          updateRule();
          self.readyToSave = _readyToSave();
        }
      }
    }

    function answerChange(answer) {
      if (!_isCustomAnswer || !answer) {
        _isCustomAnswer = false;
        self.selectedAnswer = answer;
        updateRule();
      }
      self.readyToSave = _readyToSave();
    }

    function whens(filterValue) {
      if (!filterValue) {
        return self.whenList;
      } else {
        var filterResult = self.whenList.filter(function(when) {
          return when.label.ptBR.plainText.search(filterValue) != -1 || when.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    function operatorChange(operator) {
      self.selectedOperator = operator;
      self.readyToSave = _readyToSave();
      updateRule();
    }

    function whenChange(when) {
      self.selectedWhen = when;

      self.answerSearchText = '';
      self.operatorSearchText = '';

      if (self.selectedWhen) {
        self.operatorList = _returnFilteredOperatorList(self.selectedWhen.type);
        self.answerList = RouteBuilderService.getAnswerListForRule(self.selectedWhen.item);
        self.isDisable = false;
      } else {
        self.isDisable = true;
      }

      self.readyToSave = _readyToSave();
      updateRule();
    }

    //TODO: Quando implementado recurso dos operadores retirados, esse método deve ser removido!
    function _returnFilteredOperatorList(when) {
      var list = RouteBuilderService.getOperatorListForRule(when).filter(function(element, index) {
        if (element.label.ptBR.plainText !== 'Intervalo de valores' && element.label.ptBR.plainText !== 'Está dentro do intervalo' && element.label.ptBR.plainText !== 'Está entre os valores') {
          return true;
        }
      });
      return list;
    }

    function updateRule() {
      RouteBuilderService.selectCondition(self.conditionIndex);
      if (self.ruleData && self.selectedAnswer) {
        RouteBuilderService.updateRule(self.ruleData.index, self.selectedWhen, self.selectedOperator, self.selectedAnswer, _isCustomAnswer);
      }
    }

    function deleteRule() {
      RouteBuilderService.selectCondition(self.conditionIndex);
      self.onUpdate({
        'ruleEditor': self
      });
    }

    function _initializeWhenList() {
      self.whenList = [];
      self.whenList = RouteBuilderService.getWhenListForRule();
    }

    function _readyToSave() {
      if (_resolveRuleWhen() && _resolveRuleOperator() && _resolveRuleAnswer()) {
        return true;
      } else {
        return false;
      }
    }

    function _resolveRuleWhen() {
      if (!self.selectedWhen) {
        return false;
      } else {
        return true;
      }
    }

    function _resolveRuleOperator() {
      if (!self.selectedOperator) {
        return false;
      } else {
        return true;
      }
    }

    function _resolveRuleAnswer() {
      if (_isCustomAnswer || self.selectedAnswer) {
        return true;
      } else {
        return false;
      }
    }
  }
})();

(function() {
    'use strict';

    angular
        .module('otus.textEdition')
        .service('otus.textEdition.ColorContext', service);

    function service() {
        var self = this;

        self.backgroundColor = '#448aff';
        self.textColor = '#737373';

    }

}());

(function() {
    'use strict';

    angular
        .module('otus.textEdition')
        .controller('otus.textEdition.ColorController', controller);

    controller.$inject = ['otus.textEdition.ColorContext', '$mdDialog'];

    function controller(ColorContext, $mdDialog) {
        var self = this;
        self.select = select;
        self.cancel = cancel;

        _init();

        function _init() {
            self.currentBackgroundColor = ColorContext.backgroundColor;
            self.currentTextColor = ColorContext.textColor;
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function select() {
            ColorContext.backgroundColor = self.currentBackgroundColor;
            ColorContext.textColor = self.currentTextColor;
            $mdDialog.hide();
        }
    }

}());

(function() {

    angular
        .module('ui.components')
        .directive('otusAccordion', otusAccordion);

    otusAccordion.$inject = ['OtusAccordionWidgetFactory'];

    function otusAccordion(OtusAccordionWidgetFactory) {
        var directive = {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/shared/ui-components/accordion/accordion-template.html',
            scope: {},
            link: function(scope, template, attrs, controller, transclude) {
                var userHeader, userContent;
                var templateHeader = angular.element(template.children()[0]);
                var templateContent = angular.element(template.children()[1]);

                transclude(function(clone, cloneScope) {
                    userHeader = angular.element(clone[1]);
                    userContent = angular.element(clone[3]);
                });

                userHeader.children().insertBefore(templateHeader.children());
                templateContent.append(userContent.children());

                scope.widget = OtusAccordionWidgetFactory.create(scope, attrs, scope.$parent);
            }
        };

        return directive;
    }

}());

(function() {
    'use strict';

    angular
        .module('ui.components')
        .factory('OtusAccordionWidgetFactory', OtusAccordionWidgetFactory);

    function OtusAccordionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, templateConfig, parentWidget) {
            return new OtusAccordionWidget(templateData, templateConfig, parentWidget);
        }

        return self;
    }

    function OtusAccordionWidget(templateData, templateConfig, parentWidget) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.template = {};
        self.event = {};

        /* Template definitions */
        self.template.icon = 'expand_more';

        /* CSS definitions */

        /* Instance definitions */
        self.parent = parentWidget;
        self.isToShow = false;

        self.changeState = changeState;

        function changeState() {
            self.isToShow = !self.isToShow;
            self.template.icon = (self.isToShow) ? 'expand_less' : 'expand_more';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('NewSurveyFormDialogService', NewSurveyFormDialogService);

    NewSurveyFormDialogService.$inject = ['$mdDialog'];

    function NewSurveyFormDialogService($mdDialog) {
        var self = this;

        /* Public interface */
        self.showDialog = showDialog;

        init();

        function init() {
            self.dialogSettings = {
                parent: angular.element(document.body),
                templateUrl: 'app/dashboard/survey-templates/dialog/new-survey-form/new-survey-form-dialog.html',
                controller: DialogController,
                controllerAs: 'controller',
                openFrom: '#system-toolbar',
                closeTo: {
                    bottom: 0
                }
            };
        }

        function showDialog() {
            $mdDialog
                .show(self.dialogSettings)
                .then(
                    forwardSuccessfulExecution,
                    forwardUnsuccessfulExecution
                );

            return {
                onConfirm: function (callback) {
                    self.callback = callback;
                }
            };
        }

        function forwardSuccessfulExecution(response) {
            if (response.action == 'create') {
                if (self.callback) self.callback(response.data);
            }
        }

        function forwardUnsuccessfulExecution(error) {
        }
    }

    function DialogController($mdDialog) {
        var self = this;

        /* Public interface */
        self.cancel = cancel;
        self.createSurveyForm = createSurveyForm;

        function cancel(response) {
            $mdDialog.hide(response);
        }

        function createSurveyForm(response) {
            $mdDialog.hide(response);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplate', {
            templateUrl: 'app/dashboard/survey-templates/components/survey-template/survey-template.html',
            controller: SurveyTemplateController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    SurveyTemplateController.$inject = [
        '$element',
        '$scope',
        'SelectedSurveyTemplatesManagementService'
    ];

    function SurveyTemplateController($element, $scope, SelectedSurveyTemplatesManagementService) {
        var mdCard;
        var self = this;
        self.isSelected = false;

        self.$onDestroy = function() {
            if (self.isSelected) {
                SelectedSurveyTemplatesManagementService.removeSurveyTemplate(self.surveyTemplate);
            }
        };

        $element.on('click', function() {
            mdCard = $element.children();
            if (!self.isSelected) {
                _select();
            } else {
                _remove();
            }

            _scopeApply();
        });

        function _select() {
            self.isSelected = true;
            mdCard.addClass('selected-template');
            SelectedSurveyTemplatesManagementService.selectSurveyTemplate(self.surveyTemplate);
        }

        function _remove() {
            self.isSelected = false;
            mdCard.removeClass('selected-template');
            SelectedSurveyTemplatesManagementService.removeSurveyTemplate(self.surveyTemplate);
        }

        /**
         * This method calls the AngularJS Digest Cycle
         * It updates all watchers
         */
        function _scopeApply() {
            $scope.$apply();
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplatesList', {
            templateUrl: 'app/dashboard/survey-templates/components/survey-templates-list/survey-templates-list.html',
            controller: SurveyTemplateControllerList,
        });

    SurveyTemplateControllerList.$inject = ['SurveyTemplateManagerService'];

    function SurveyTemplateControllerList(SurveyTemplateManagerService) {
        var self = this;

        self.getSurveyTemplatesList = getSurveyTemplatesList;

        function getSurveyTemplatesList() {
            return SurveyTemplateManagerService.surveyTemplates;
        }

        self.$onInit = function() {
            SurveyTemplateManagerService.initializeSurveyTemplateList();
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplatesToolbar', {
            templateUrl: 'app/dashboard/survey-templates/components/survey-templates-toolbar/survey-templates-toolbar-template.html',
            controller: SurveyTemplatesToolbarController,
        });

    SurveyTemplatesToolbarController.$inject = [
        'SurveyTemplateManagerService',
        'SelectedSurveyTemplatesManagementService',
        '$mdToast',
        'DashboardStateService',
        '$window'
    ];

    function SurveyTemplatesToolbarController(SurveyTemplateManagerService, SelectedSurveyTemplatesManagementService, $mdToast, DashboardStateService, $window, ActivityFacadeService) {
        var self = this;

        self.SelectedSurveyTemplatesManagementService = SelectedSurveyTemplatesManagementService;
        self.deleteSelectedSurveyTemplate = deleteSelectedSurveyTemplate;
        self.openEditorForSelectedSurveyTemplate = openEditorForSelectedSurveyTemplate;

        function deleteSelectedSurveyTemplate() {
            SelectedSurveyTemplatesManagementService.selectedSurveyTemplates.forEach(function(template) {
                SurveyTemplateManagerService.deleteSurveyTemplate(template);
            });
            $mdToast.show($mdToast.simple().textContent('Template(s) removido(s) com sucesso!'));
        }

        function openEditorForSelectedSurveyTemplate() {
            var selectedSurveyTemplate = _getSelectedSurveyTemplate();

            $window.sessionStorage.setItem('surveyTemplate_OID', selectedSurveyTemplate.oid);
            DashboardStateService.goToEditorWithSurveyTemplate(selectedSurveyTemplate);
        }

        function _getSelectedSurveyTemplate() {
            return SelectedSurveyTemplatesManagementService.selectedSurveyTemplates[0].template;
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusButton', directive);

    directive.$inject = ['OtusButtonWidgetFactory'];

    function directive(OtusButtonWidgetFactory) {
        var ddo = {
            scope: {
                click: '='
            },
            templateUrl: 'app/editor/ui/base/button/button.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.widget = OtusButtonWidgetFactory.create(scope, attrs, scope.$parent.widget);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusButtonWidgetFactory', OtusButtonWidgetFactory);

    function OtusButtonWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, templateConfig, parentWidget) {
            return new OtusButtonWidget(templateData, templateConfig, parentWidget);
        }

        return self;
    }

    function OtusButtonWidget(templateData, templateConfig, parentWidget) {
        var self = this;

        /* Valid values */
        var validTooltipDirections = ['top', 'bottom', 'left', 'right'];

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.template = {};
        self.event = {};

        /* Template definitions */
        self.template.ariaLabel = templateConfig.ariaLabel || templateConfig.label;
        self.template.label = templateConfig.label;
        self.template.tooltip = templateConfig.tooltip || templateConfig.label;
        self.template.tooltipDirection = (templateConfig.tooltipDirection !== undefined && (validTooltipDirections.indexOf(templateConfig.tooltipDirection) !== -1)) ? templateConfig.tooltipDirection : 'top';
        self.template.leftIcon = templateConfig.iconButton || templateConfig.leftIcon;
        self.template.rightIcon = templateConfig.rightIcon;

        self.template.hasLeftIcon = self.template.leftIcon !== undefined;
        self.template.hasRightIcon = (templateConfig.iconButton === undefined && self.template.rightIcon !== undefined);

        /* CSS definitions */
        self.css.iconButton = (templateConfig.iconButton !== undefined) ? 'md-icon-button' : '';

        /* Instance definitions */
        self.parent = parentWidget;

        /* Event definitions */
        self.event.click = templateData.click;
    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusCustomValue', {
      templateUrl: 'app/editor/ui/base/custom-value/custom-value.html',
      controller: Controller,
      bindings: {
        option: '<',
        checkFunction: '&'
      }
    });

  Controller.$inject = ['$element', 'CustomValueService'];

  function Controller($element, CustomValueService) {
    var _checkFunction;
    var _option;

    self = this;
    self.$onInit = onInit;
    self.$postLink = postLink;

    function onInit() {
      _checkFunction = self.checkFunction;
      _option = self.option;
    }

    function postLink() {
      $element.children()[0].innerText = _option.customValue;
      $element.on('focusout', _execute);
    }

    function _execute(event) {
      CustomValueService.execute(event, _option, _checkFunction);
    }
  }

})();

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('EditableCustomIDService', EditableCustomIDService);

    EditableCustomIDService.$inject = [
        'WorkspaceService',
        'UpdateQuestionEventFactory',
        '$mdToast'
    ];

    function EditableCustomIDService(WorkspaceService, UpdateQuestionEventFactory, $mdToast) {
        var self = this;

        self.isEmpty = isEmpty;
        self.removeAllBlankSpaces = removeAllBlankSpaces;
        self.restoreScreenID = restoreScreenID;
        self.hasChanges = hasChanges;
        self.execute = execute;

        function isEmpty(customizedID) {
            return customizedID === '';
        }

        function removeAllBlankSpaces(customizedID) {
            return customizedID.replace(/\s/g, '');
        }

        function restoreScreenID(event, editableID_Object) {
            event.target.innerText = editableID_Object.getCustomizedID();
        }

        function hasChanges(customizedID, editableID_Object) {
            return customizedID !== editableID_Object.getCustomizedID();
        }

        function execute(event, editableID_Object) {
            var customizedID = removeAllBlankSpaces(event.target.innerText);

            if (customizedID === editableID_Object.getCustomizedID() || isEmpty(customizedID)) {
                restoreScreenID(event, editableID_Object);
            } else {
                if (hasChanges(customizedID, editableID_Object)) {
                    if (_checkIfIsAvailable(customizedID)) {
                        editableID_Object.updateCustomizedID(customizedID);
                        UpdateQuestionEventFactory.create().execute(self);
                        restoreScreenID(event, editableID_Object);
                    } else {
                        $mdToast.show($mdToast.simple().textContent('O ID inserido já está em uso.'));
                        restoreScreenID(event, editableID_Object);
                    }
                }
            }
        }

        function _checkIfIsAvailable(customizedID) {
            return WorkspaceService.getSurvey().isAvailableCustomID(customizedID) ? true : false;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .component('editableId', {
            templateUrl: 'app/editor/ui/base/editable-id/editable-id.html',
            controller: EditableID,
            bindings: {
                item: '<'
            }
        });

    EditableID.$inject = [
        '$element',
        'EditableIDFactory',
        'EditableCustomIDService'
    ];

    function EditableID($element, EditableIDFactory, EditableCustomIDService) {
        self = this;
        var _editableID;

        self.$onInit = onInit;

        function onInit() {
            _editableID = EditableIDFactory.create(self.item);
            $element.children()[0].innerText = _editableID.getCustomizedID();
        }

        $element.on('focusout', function(event) {
            EditableCustomIDService.execute(event, _editableID);
        });

    }

})();

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('EditableIDFactory', EditableIDFactory);

    EditableIDFactory.$inject = ['UpdateSurveyItemCustomID'];

    function EditableIDFactory(UpdateSurveyItemCustomID) {
        var self = this;

        self.create = create;

        function create(object) {
            return new EditableIDComponent(object, UpdateSurveyItemCustomID);
        }

        return self;
    }

    function EditableIDComponent(object, UpdateSurveyItemCustomID) {
        var self = this;
        var _object = object;
        var _lastValidID;

        self.getCustomizedID = getCustomizedID;
        self.getAutoGeneratedID = getAutoGeneratedID;
        self.getLastValidID = getLastValidID;
        self.updateCustomizedID = updateCustomizedID;

        function getAutoGeneratedID() {
            var autoGeneratedID;
            if (_object.objectType === "CheckboxAnswerOption") {
                autoGeneratedID = _object.optionID;
            } else {
                autoGeneratedID = _object.templateID;
            }
            return autoGeneratedID;
        }

        function getCustomizedID() {
            var customizedID;
            if (_object.objectType === "CheckboxAnswerOption") {
                customizedID = _object.customOptionID;
            } else {
                customizedID = _object.customID;
            }
            return customizedID;
        }

        function getLastValidID() {
            return _lastValidID;
        }

        function updateCustomizedID(customizedID) {
            _lastValidID = customizedID;
            if (_object.objectType === "CheckboxAnswerOption") {
                _object.setCustomOptionID(customizedID);
            } else {
                UpdateSurveyItemCustomID.execute(_object, customizedID);
            }
        }
    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusExtractionValue', {
      templateUrl: 'app/editor/ui/base/extraction-value/extraction-value.html',
      controller: Controller,
      bindings: {
        option: '<',
        checkFunction: '&'
      }
    });

  Controller.$inject = ['$element', 'otusjs.studio.editor.ui.ExtractionValueService'];

  function Controller($element, ExtractionValueService) {
    var _checkFunction;
    var _option;

    self = this;
    self.$onInit = onInit;
    self.$postLink = postLink;

    function onInit() {
      _checkFunction = self.checkFunction;
      _option = self.option;
    }

    function postLink() {
      $element.children()[0].innerText = _option.extractionValue;
      $element.on('focusout', _execute);
    }

    function _execute(event) {
      ExtractionValueService.execute(event, _option, _checkFunction);
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .service('otusjs.studio.editor.ui.ExtractionValueService', Service);

  Service.$inject = [
    'UpdateQuestionEventFactory',
    '$mdToast'
  ];

  function Service(UpdateQuestionEventFactory, $mdToast) {
    var self = this;

    self.execute = execute;

    function execute(event, option, checkFunction) {
      var newValue = removeAllBlankSpaces(event.target.innerText);

      if (newValue === option.extractionValue.toString() || isEmpty(newValue)) {
        updateView(event, option);
      } else {
        if (hasChanges(newValue, option)) {
          if (checkFunction({
              $event: {
                newValue: newValue
              }
            })) {
            option.setExtractionValue(newValue);
            UpdateQuestionEventFactory.create().execute(self);
            updateView(event, option);
          } else {
            $mdToast.show($mdToast.simple().textContent('O valor não pode ser repetido.'));
            updateView(event, option);
          }
        }
      }
    }

    function isEmpty(newValue) {
      return newValue === '';
    }

    function removeAllBlankSpaces(newValue) {
      return newValue.replace(/\s/g, '');
    }

    function updateView(event, option) {
      event.target.innerText = option.extractionValue;
    }

    function hasChanges(newValue, option) {
      return newValue !== option.extractionValue;
    }
  }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusInputText', otusInputText);

    otusInputText.$inject = ['OtusInputTextWidgetFactory'];

    function otusInputText(OtusInputTextWidgetFactory) {
        var ddo = {
            scope: {
                model: '=',
                disabled: '@'
            },
            templateUrl: 'app/editor/ui/base/input-text/input-text.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.widget = OtusInputTextWidgetFactory.create(scope, attrs, element, scope.$parent.widget || scope.$parent.$parent.childWidget);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusInputTextWidgetFactory', OtusInputTextWidgetFactory);

    function OtusInputTextWidgetFactory() {
        var self = this;

        self.create = create;

        function create(templateData, templateConfig, element, parentWidget) {
            return new OtusInputTextWidget(templateData, templateConfig, element, parentWidget);
        }

        return self;
    }

    function OtusInputTextWidget(templateData, templateConfig, element, parentWidget) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.template = {};
        self.event = {};

        /* Template definitions */
        self.template.ariaLabel = templateConfig.ariaLabel || templateConfig.label;
        self.template.label = templateConfig.label;
        self.template.leftIcon = templateConfig.iconButton || templateConfig.leftIcon;
        self.template.rightIcon = templateConfig.rightIcon;

        self.template.hasLeftIcon = self.template.leftIcon !== undefined;
        self.template.hasRightIcon = (templateConfig.iconButton === undefined && self.template.rightIcon !== undefined);

        /* Instance definitions */
        self.parent = parentWidget;
        self.modelReference = templateData.model;

        /* CSS definitions */
        self.style = templateData.style;

        if (templateData.model instanceof Function)
            self.model = templateData.model();
        else
            self.model = templateData.model;

        element.on('change', function() {
            if (self.modelReference instanceof Function)
                self.modelReference(self.model);
            else
                self.modelReference = self.model;
        });
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusTextEditor', directive);

    directive.$inject = ['OtusTextEditorWidgetFactory'];

    function directive(OtusTextEditorWidgetFactory) {
        var ddo = {
            scope: {
                placeholder: '@',
                label: '=',
                ariaLabel: '@',
                leftIcon: '@',
                ngModel: '='
            },
            templateUrl: 'app/editor/ui/base/text-editor/text-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element) {
                scope.widget = OtusTextEditorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusTextEditorWidgetFactory', OtusTextEditorWidgetFactory);

    OtusTextEditorWidgetFactory.$inject = [
        'UpdateQuestionEventFactory'
    ];

    function OtusTextEditorWidgetFactory(UpdateQuestionEventFactory) {
        var self = this;

        self.create = create;

        function create(scope, element) {
            return new OtusTextEditorWidget(scope, element, UpdateQuestionEventFactory);
        }
        return self;
    }

    function OtusTextEditorWidget(scope, element, UpdateQuestionEventFactory) {
        var self = this;

        self.input = angular.element(element.children()[0]);
        self.ngModel = scope.ngModel;
        self.placeholder = scope.placeholder;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getLabel = getLabel;

        _init();

        function _init() {
            if (self.ngModel) {
                _loadLabel();
            }
        }

        function getClassName() {
            return 'OtusTextEditorWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getLabel() {
            return self.ngModel.ptBR.formattedText;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }


        element.on('focusout', function(event) {
            _saveLabel();
            UpdateQuestionEventFactory.create().execute(self);
        });

        function _saveLabel() {
            self.ngModel.ptBR.formattedText = _removeSpecialCharacters(event.target.innerHTML);
            self.ngModel.ptBR.plainText = event.target.innerText;
        }

        function _removeSpecialCharacters(value) {
            return value.replace(/"/g, '\'');
        }

        function _loadLabel() {
            self.getElement().children()[0].innerHTML = self.getLabel();
        }
    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusMetadataGroup', otusMetadataGroup);

  otusMetadataGroup.$inject = [
    'MetadataGroupWidgetFactory'
  ];

  function otusMetadataGroup(MetadataGroupWidgetFactory) {
    var ddo = {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/editor/ui/metadata/group/metadata-group.html',
      link: function(scope, element) {
        scope.widget = MetadataGroupWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('MetadataGroupWidgetFactory', MetadataGroupWidgetFactory);

  MetadataGroupWidgetFactory.$inject = [
    'MetadataOptionWidgetFactory',
    'AddMetadataAnswerEventFactory',
    'RemoveMetadataOptionEventFactory',
    'MetadataAnswerFactory'
  ];

  function MetadataGroupWidgetFactory(MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory, MetadataAnswerFactory) {
    var self = this;

    /*Public interface*/
    self.create = create;

    function create(scope, element) {
      return new MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory, MetadataAnswerFactory);
    }

    return self;
  }

  function MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory, MetadataAnswerFactory) {
    var self = this;
    self.ngModel = scope.ngModel;
    self.options = [];

    /* Public methods */
    self.getClassName = getClassName;
    self.getUUID = getUUID;
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItem = getItem;
    self.addOption = addOption;
    self.removeLastOption = removeLastOption;
    self.removeLastOption = removeLastOption;
    self.isAvailableExtractionValue = isAvailableExtractionValue;

    _init();

    function _init() {
      if (self.getItem().metadata.options.length > 0) {
        _loadOptions();
      }
    }

    function getClassName() {
      return 'MetadataGroupWidget';
    }

    function getUUID() {
      return scope.uuid;
    }

    function getElement() {
      return element;
    }

    function getParent() {
      return scope.$parent.widget;
    }

    function getItem() {
      return getParent().getItem();
    }

    function _loadOptions() {
      var clonedArray = angular.copy(self.getItem().metadata.options);
      self.getItem().metadata.options = [];

      clonedArray.forEach(function(option) {
        var optionInstance = MetadataAnswerFactory.fromJsonObject(option);
        self.getItem().metadata.options.push(optionInstance);
        var optionWidget = MetadataOptionWidgetFactory.create(optionInstance, self);
        self.options.push(optionWidget);
      });
    }

    function addOption() {
      var newOption = AddMetadataAnswerEventFactory.create().execute(self);
      var optionWidget = MetadataOptionWidgetFactory.create(newOption, self);
      self.options.push(optionWidget);
    }

    function removeLastOption() {
      RemoveMetadataOptionEventFactory.create().execute(self);
      self.options.splice(-1);
    }

    function isAvailableExtractionValue($event) {
      return self.getItem().metadata.isAvailableExtractionValue($event.newValue);
    }
  }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('MetadataOptionWidgetFactory', MetadataOptionWidgetFactory);

  function MetadataOptionWidgetFactory() {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(option, parentGroup) {
      return new MetadataAnswerOptionWidget(option, parentGroup);
    }

    return self;
  }

  function MetadataAnswerOptionWidget(option, parentGroup) {
    var self = this;

    self.name = 'MetadataAnswerOption';
    self.parentGroup = parentGroup;
    self.option = option;
  }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusAcceptAnswer', {
      templateUrl: 'app/editor/ui/rule/accept-answer/accept-answer.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'AddFillingRulesEventFactory',
    'RemoveFillingRulesEventFactory',
    'UpdateFillingRulesEventFactory'
  ];

  function Controller(AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, UpdateFillingRulesEventFactory) {

    var self = this;
    var whoAmI = 'accept';

    /* Public methods */
    self.data;
    self.$onInit = onInit;
    self.updateData = updateData;
    self.getItem = getItem;

    function onInit() {
      if (self.item.fillingRules.options.accept == undefined) {
        self.data = false;
      } else {
        self.data = self.item.fillingRules.options.accept.data.reference;
        updateData();
      }
    }

    function updateData() {
      if (self.data) {
        AddFillingRulesEventFactory.create().execute(self.item, whoAmI);
        _getRuleType().data.reference = self.data;
        UpdateFillingRulesEventFactory.create().execute();
      } else {
        RemoveFillingRulesEventFactory.create().execute(self, whoAmI);
      }
    }

    function _getRuleType() {
      return self.item.fillingRules.options.accept;
    }

    function getItem() {
      return self.item;
    }

  }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('miscItem', directive);

    directive.$inject = [
        'SurveyItemWidgetFactory',
        'SheetContentService'
    ];

    function directive(SurveyItemWidgetFactory, SheetContentService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/misc/misc.html',
            retrict: 'E',
            link: function linkFunc(scope, element) {
                scope.widget = SurveyItemWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionItem', directive);

    directive.$inject = [
        'SurveyItemWidgetFactory',
        'SheetContentService'
    ];

    function directive(SurveyItemWidgetFactory, SheetContentService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/question.html',
            retrict: 'E',
            link: function linkFunc(scope, element) {
                scope.widget = SurveyItemWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusItemIcon', otusItemIcon);

  otusItemIcon.$inject = [];

  function otusItemIcon() {
    var ddo = {
      scope: {
        item: '@item',
      },
      templateUrl: 'app/editor/ui/survey-item-editor/item-icon/otus-item-icon-template.html',
      retrict: 'E',
      link: function linkFunc(scope, element, attrs) {
        scope.type = getItemIcon(scope.item);
      }
    };

    return ddo;
  }

  function getItemIcon(objectType) {
    var mapping = {
      CalendarQuestion: {
        icon: 'date_range',
        tooltip: 'Data'
      },
      IntegerQuestion: {
        icon: 'looks_one',
        tooltip: 'Número Inteiro'
      },
      DecimalQuestion: {
        icon: 'exposure_zero',
        tooltip: 'Número Decimal'
      },
      SingleSelectionQuestion: {
        icon: 'radio_button_checked',
        tooltip: 'Seleção Única'
      },
      CheckboxQuestion: {
        icon: 'check_box',
        tooltip: 'Checkbox'
      },
      TextQuestion: {
        icon: 'text_format',
        tooltip: 'Texto'
      },
      EmailQuestion: {
        icon: 'email',
        tooltip: 'Email'
      },
      TimeQuestion: {
        icon: 'access_time',
        tooltip: 'Hora'
      },
      PhoneQuestion: {
        icon: 'phone',
        tooltip: 'Telefone'
      },
      TextItem: {
        icon: 'message',
        tooltip: 'Texto'
      },
      ImageItem: {
        icon: 'image',
        tooltip: 'Imagem'
      }
    };

    return mapping[objectType];
  }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SurveyItemSettingsContentService', SurveyItemSettingsContentService);

    SurveyItemSettingsContentService.$inject = [
        'TemplateLoaderService',
    ];

    function SurveyItemSettingsContentService(TemplateLoaderService) {
        var self = this;

        self.loadNavigation = loadNavigation;
        self.closeNavigation = closeNavigation;

        function loadNavigation(contentArea, scope) {
            TemplateLoaderService.load(NAVIGATION_TEMPLATE, scope, function(template) {
                contentArea.append(template);
            });
        }

        function closeNavigation(contentArea) {
            contentArea.empty();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SurveyItemSettingsController', SurveyItemSettingsController);

    SurveyItemSettingsController.$inject = [
        '$scope',
        '$element',
        'SurveyItemSettingsContentService'
    ];

    function SurveyItemSettingsController($scope, $element, SurveyItemSettingsContentService) {
        var self = this;

        self.navigation = navigation;

        function navigation(templateID) {
            var contentArea = $element.find('.toolbar-content-' + templateID);

            if (!contentArea.children().length) {
                SurveyItemSettingsContentService.loadNavigation(contentArea, $scope);
            } else {
                SurveyItemSettingsContentService.closeNavigation(contentArea);
            }
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSurveyItemSettings', directive);

    directive.$inject = [
        'SurveyItemSettingsWidgetFactory',
        'UUIDService'
    ];

    function directive(SurveyItemSettingsWidgetFactory, UUIDService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'SurveyItemSettingsController',
            templateUrl: 'app/editor/ui/survey-item-editor/survey-item-settings/survey-item-settings.html',
            link: function(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                scope.widget = SurveyItemSettingsWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SurveyItemSettingsWidgetFactory', SurveyItemSettingsWidgetFactory);

    function SurveyItemSettingsWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new SurveyItemSettingsWidget(scope, element);
        }

        return self;
    }

    function SurveyItemSettingsWidget(scope, element) {
        var self = this;

        self.className = 'SurveyItemSettingsWidget';

        self.ngClass = {};
        /* Template definitions */
        self.ngClass.open = false;
        self.showNavigationEditor = false;
        self.showValidationEditor = false;

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.navigationButton = navigationButton;
        self.validationButton = validationButton;

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.$parent.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function navigationButton() {
            self.ngClass.open = !self.ngClass.open;
            self.showNavigationEditor = !self.showNavigationEditor;
        }

        function validationButton() {          
            self.ngClass.open = !self.ngClass.open;
            self.showValidationEditor = !self.showValidationEditor;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusFillingRulesEditor', otusFillingRulesEditor);

    otusFillingRulesEditor.$inject = [
        'FillingRulesEditorWidgetFactory'
    ];

    function otusFillingRulesEditor(FillingRulesEditorWidgetFactory) {
        var ddo = {
            scope: {
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/editor/validation-editor.html',
            link: function linkFunc(scope, element) {
                scope.widget = FillingRulesEditorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FillingRulesEditorWidgetFactory', FillingRulesEditorWidgetFactory);

    FillingRulesEditorWidgetFactory.$inject = [
        'AddFillingRulesEventFactory',
        'RemoveFillingRulesEventFactory',
        'OtusFillingRulesWidgetFactory',
        '$compile',
        'UpdateFillingRulesEventFactory'

    ];

    function FillingRulesEditorWidgetFactory(AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new FillingRulesEditorWidget(scope, element, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory);
        }

        return self;

    }

    function FillingRulesEditorWidget(scope, element, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory) {
        var self = this;
        self.ngModel = scope.ngModel;

        /* Public methods */
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.addValidator = addValidator;
        self.checkIfShow = checkIfShow;
        self.deleteValidator = deleteValidator;
        self.updateFillingRules = updateFillingRules;
        self.menuDisabler = menuDisabler;

        _init();

        function _init() {
            showList = showListFeeder();
            if (Object.keys(self.getItem().fillingRules.options).length > 0) {
                _loadOptions();
            } else {
                addValidator('mandatory');
            }
        }
        var showList;

        function showListFeeder() {
            var showList = getItem().validators();
            return showList;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function _loadOptions() {
            Object.keys(self.getItem().fillingRules.options).forEach(function(validatorToLoad) {
                appendFillingRules(validatorToLoad);
            });
        }

        function addValidator(validator) {
            AddFillingRulesEventFactory.create().execute(getItem(), validator);
            appendFillingRules(validator);
        }

        function appendFillingRules(validator) {
            showList.splice(showList.indexOf(validator), 1);
            var template = OtusFillingRulesWidgetFactory.create(validator);
            var validatorsColumn = element.find('#validators-column');
            var validatorTemplate = $compile(template)(scope);
            validatorsColumn.append(validatorTemplate);
        }

        function deleteValidator(validator) {
            showList.push(validator);
            RemoveFillingRulesEventFactory.create().execute(self, validator);
        }


        function updateFillingRules() {
            UpdateFillingRulesEventFactory.create().execute();
        }


        function checkIfShow(fillingRule) {
            if (showList.indexOf(fillingRule) > -1) {
                return true;
            } else {
                return false;
            }
        }

        function menuDisabler() {
            if (showList.length > 0) {
                return false;
            } else {
                return true;
            }
        }

    }

}());

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.TextDialogService', service);

  service.$inject = [
    '$mdDialog'
  ];

  function service($mdDialog) {
    var self = this;
    var _dialogSettings = {};

    _init();

    /* Public methods */
    self.showDialog = showDialog;

    function _init() {
      _dialogSettings.templateUrl = 'app/navigation-builder/messenger/dialog/text/text-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = false;
      _dialogSettings.fullscreen = false;
      _dialogSettings.hasBackdrop = false;
    }

    function showDialog(message) {
      _dialogSettings.locals = {
        message: message
      };
      $mdDialog.show(_dialogSettings);
    }
  }

  function DialogController($mdDialog, message) {
    var self = this;

    self.message = message;

    /* Public interface */
    self.cancel = cancel;
    self.confirm = confirm;

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function confirm(response) {
      $mdDialog.hide(response);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.TextPanelService', service);

  service.$inject = [
    '$mdPanel'
  ];

  function service($mdPanel) {
    var self = this;
    var _dialogSettings = {};
    var _panelRef = null;

    _init();

    /* Public methods */
    self.showDialog = showDialog;

    function _init() {
      var panelPosition = $mdPanel.newPanelPosition()
      .absolute()
      .center();

      // var panelAnimation = $mdPanelAnimation
      //   .targetEvent($event)
      //   .defaultAnimation('md-panel-animate-fly')
      //   .closeTo('.show-button');

      _dialogSettings.attachTo = angular.element(document.body);
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.position = panelPosition;
      // _dialogSettings.targetEvent = $event;
      _dialogSettings.templateUrl = 'app/navigation-builder/messenger/dialog/text/text-panel-template.html';
    }

    function showDialog(message) {
      _dialogSettings.locals = {
        message: message
      };

      _panelRef = $mdPanel.create(_dialogSettings);
      _panelRef.open().finally(function() {
        _panelRef = undefined;
      });
    }
  }

  function DialogController(message) {
    var self = this;

    self.message = message;

    /* Public interface */
    self.cancel = cancel;
    self.confirm = confirm;

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function confirm(response) {
      $mdDialog.hide(response);
    }
  }
})();

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('imageItem', imageItem);

    function imageItem(ImageItemWidgetFactory) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/misc/image/image-item.html',
            retrict: 'E',
            link: function(scope, element) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ImageItemWidgetFactory', ImageItemWidgetFactory);

    function ImageItemWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new ImageItemWidget(scope);
        }

        return self;
    }

    function ImageItemWidget(scope) {
        var self = this;

        self.name = 'ImageItem';
        self.getParent = getParent;
        self.item = getItem();
        self.getTemplate = getTemplate;

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<image-item></image-item>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('textItem', textItem);

    textItem.$inject = ['TextItemWidgetFactory'];

    function textItem(TextItemWidgetFactory) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/misc/text/text-item.html',
            retrict: 'E',
            link: function(scope, element) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TextItemWidgetFactory', TextItemWidgetFactory);

    function TextItemWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new TextItemWidget(scope);
        }

        return self;
    }

    function TextItemWidget(scope) {
        var self = this;

        self.name = 'TextItem';
        self.getParent = getParent;
        self.item = getItem();
        self.getTemplate = getTemplate;

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<text-item></text-item>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('calendarQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/calendar/calendar-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('CalendarQuestionWidgetFactory', CalendarQuestionWidgetFactory);

    function CalendarQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new CalendarQuestionWidget(scope, element);
        }

        return self;
    }

    function CalendarQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;


        function getClassName() {
            return 'CalendarQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<calendar-question></calendar-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('checkboxQuestion', checkboxQuestion);

    checkboxQuestion.$inject = [
        'CheckboxQuestionWidgetFactory'
    ];

    function checkboxQuestion(CheckboxQuestionWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/survey-item/question/checkbox/checkbox-question.html',
            link: function(scope, element) {
                scope.widget = CheckboxQuestionWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('CheckboxQuestionWidgetFactory', CheckboxQuestionWidgetFactory);

    CheckboxQuestionWidgetFactory.$inject = [
        'UpdateQuestionEventFactory',
        'CheckboxSuffixIDGenerator',
        'WorkspaceService'
    ];

    function CheckboxQuestionWidgetFactory(UpdateQuestionEventFactory, CheckboxSuffixIDGenerator, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new CheckboxQuestionWidget(scope, element, UpdateQuestionEventFactory, CheckboxSuffixIDGenerator, WorkspaceService);
        }

        return self;
    }

    function CheckboxQuestionWidget(scope, element, UpdateQuestionEventFactory, CheckboxSuffixIDGenerator, WorkspaceService) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

        _init();

        function _init() {
            if (self.getItem().options.length > 0) {
                _loadAnswerOptions();
            }
        }

        function getClassName() {
            return 'CheckboxQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<checkbox-question></checkbox-question>';
        }

        function addOption() {
            self.getItem().createOption(_generateOptionId());
            UpdateQuestionEventFactory.create().execute(self.getItem());
        }

        function _loadAnswerOptions() {
            var clonedArray = angular.copy(self.getItem().options);
            self.getItem().options = [];

            clonedArray.forEach(function(checkboxAnswerOption) {
                self.getItem().loadJsonOption(JSON.stringify(checkboxAnswerOption));
            });
        }

        function removeLastOption() {
            self.getItem().removeLastOption();
            UpdateQuestionEventFactory.create().execute(self.getItem());
        }

        function _generateOptionId() {
            var checkboxID;
            var quantity = self.getItem().options.length;
            do {
                checkboxID = self.getItem().customID + CheckboxSuffixIDGenerator.generateSuffixByOptionsLength(quantity++);
            } while (!WorkspaceService.getSurvey().isAvailableCustomID(checkboxID));
            return checkboxID;
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('decimalQuestion', directive);

    directive.$inject = ['DecimalQuestionWidgetFactory'];

    function directive(DecimalQuestionWidgetFactory) {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/decimal/decimal-question.html',
            restrict: 'E',
            link: function(scope, element) {
                scope.widget = DecimalQuestionWidgetFactory.create(scope, element);
            }
        };
        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('DecimalQuestionWidgetFactory', DecimalQuestionWidgetFactory);

    function DecimalQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new DecimalQuestionWidget(scope, element);
        }

        return self;
    }

    function DecimalQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'DecimalQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<decimal-question></decimal-question>';
        }
    }

}());

(function() {
    'use strict';

    angular.module("editor.ui").directive("uiDecimal", function() {
        return {
            link: function($scope, element, attrs, ngModelCtrl) {
                var lastValidValue;

                element.on('keydown', shouldPrintChar);

                function shouldPrintChar(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    return (isNumberKey(keycode) || isValidKey(keycode));
                }

                element.on('keyup', formatedInteger);

                function formatedInteger(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    var currentValue = element.val();

                    if (currentValue.length === 0) {
                        lastValidValue = '';
                    } else if (isNumberKey(keycode) || isValidKey(keycode)) {
                        lastValidValue = element.val();
                    } else if (!isValidKey(keycode)) {
                        element.val(lastValidValue);
                    }
                }

                function isNumberKey(keycode) {
                    return ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105)) ? true : false;
                }

                function isValidKey(keycode) {
                    var minusKey = (keycode === 109);
                    var commaKey = (keycode === 188);
                    var dotKey = (keycode === 190);
                    var numpadDot = (keycode === 194);
                    var decimalPoint = (keycode === 110);
                    var shiftKey = (keycode === 16);
                    var backspaceKey = (keycode === 8);
                    var homeKey = (keycode === 36);
                    var endKey = (keycode === 35);
                    var deleteKey = (keycode === 46);
                    var controlKey = (keycode === 17);
                    var leftKey = (keycode === 37);
                    var rightKey = (keycode === 39);

                    return (minusKey || commaKey || dotKey || numpadDot || decimalPoint || shiftKey || backspaceKey || homeKey || endKey || deleteKey || controlKey || leftKey || rightKey);
                }
            }
        };
    });
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('emailQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/email/email-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('EmailQuestionWidgetFactory', EmailQuestionWidgetFactory);

    function EmailQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new EmailQuestionWidget(scope, element);
        }

        return self;
    }

    function EmailQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'EmailQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<email-question></email-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('integerQuestion', directive);

    directive.$inject = ['IntegerQuestionWidgetFactory'];

    function directive(IntegerQuestionWidgetFactory) {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/integer/integer-question.html',
            restrict: 'E',
            link: function(scope, element) {
                scope.widget = IntegerQuestionWidgetFactory.create(scope, element);
            }
        };
        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('IntegerQuestionWidgetFactory', IntegerQuestionWidgetFactory);

    function IntegerQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new IntegerQuestionWidget(scope, element);
        }

        return self;
    }

    function IntegerQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'IntegerQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<integer-question></integer-question>';
        }
    }

}());

(function() {
    'use strict';

    angular.module("editor.ui").directive("uiInteger", function() {
        return {
            link: function($scope, element, attrs, ngModelCtrl) {
                var lastValidValue;

                element.on('keydown', shouldPrintChar);

                function shouldPrintChar(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    return (isNumberKey(keycode) || isValidKey(keycode));
                }

                element.on('keyup', formatedInteger);

                function formatedInteger(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    var currentValue = element.val();

                    if (currentValue.length === 0) {
                        lastValidValue = '';
                    } else if (isNumberKey(keycode) || isValidKey(keycode)) {
                        lastValidValue = element.val();
                    } else if (!isValidKey(keycode)) {
                        element.val(lastValidValue);
                    }
                }

                function isNumberKey(keycode) {
                    return ((keycode >= 48 && keycode <= 57) || (keycode >= 96 && keycode <= 105)) ? true : false;
                }

                function isValidKey(keycode) {
                    var minusKey = (keycode === 109);
                    var shiftKey = (keycode === 16);
                    var backspaceKey = (keycode === 8);
                    var homeKey = (keycode === 36);
                    var endKey = (keycode === 35);
                    var deleteKey = (keycode === 46);
                    var controlKey = (keycode === 17);
                    var leftKey = (keycode === 37);
                    var rightKey = (keycode === 39);

                    return (minusKey || shiftKey || backspaceKey || homeKey || endKey || deleteKey || controlKey || leftKey || rightKey);
                }
            }
        };
    });

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('phoneQuestion', directive);

    function directive() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/phone/phone-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PhoneQuestionWidgetFactory', PhoneQuestionWidgetFactory);

    function PhoneQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new PhoneQuestionWidget(scope, element);
        }

        return self;
    }

    function PhoneQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'PhoneQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<phone-question></phone-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('textQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/text/text-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TextQuestionWidgetFactory', TextQuestionWidgetFactory);

    function TextQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new TextQuestionWidget(scope, element);
        }

        return self;
    }

    function TextQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'TextQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<text-question></text-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('timeQuestion', directive);

    function directive() {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/question/time/time-question.html',
            retrict: 'E'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TimeQuestionWidgetFactory', TimeQuestionWidgetFactory);

    function TimeQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new TimeQuestionWidget(scope, element);
        }

        return self;
    }

    function TimeQuestionWidget(scope, element) {
        var self = this;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;

        function getClassName() {
            return 'TimeQuestionWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function getTemplate() {
            return '<time-question></time-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusAlphanumericValidator', otusAlphanumericValidator);

    otusAlphanumericValidator.$inject = [
        'AlphanumericValidatorWidgetFactory'
    ];

    function otusAlphanumericValidator(AlphanumericValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/alphanumeric/alphanumeric-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = AlphanumericValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('AlphanumericValidatorWidgetFactory', AlphanumericValidatorWidgetFactory);

    function AlphanumericValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new AlphanumericValidator(scope, element);
        }

        return self;
    }

    function AlphanumericValidator(scope, element) {
        var self = this;
        var whoAmI = 'alphanumeric';


        /* Public Methods */
        self.data = true;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = parent.fillingRules.options;
            if (avaiableRules.hasOwnProperty(whoAmI)) {
                self.data = avaiableRules[whoAmI].data.reference;
            }
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return parent.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusDistinctValidator', otusDistinctValidator);

    otusDistinctValidator.$inject = [
        'DistinctValidatorWidgetFactory'
    ];

    function otusDistinctValidator(DistinctValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/distinct/distinct-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = DistinctValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('DistinctValidatorWidgetFactory', DistinctValidatorWidgetFactory);

    function DistinctValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new DistinctValidator(scope, element);
        }

        return self;
    }

    function DistinctValidator(scope, element) {
        var self = this;
        var whoAmI = 'distinct';


        /* Public Methods */
        self.data;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
        }


        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusFutureDateValidator', otusFutureDateValidator);

    otusFutureDateValidator.$inject = [
        'FutureDateValidatorWidgetFactory'
    ];

    function otusFutureDateValidator(FutureDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/future-date/future-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = FutureDateValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FutureDateValidatorWidgetFactory', FutureDateValidatorWidgetFactory);

    function FutureDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new FutureDateValidator(scope, element);
        }

        return self;
    }

    function FutureDateValidator(scope, element) {
        var self = this;
        var whoAmI = 'futureDate';

        /* Public Methods */
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;


        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            if (avaiableRules.hasOwnProperty(whoAmI)) {
                self.data = question.fillingRules.options[whoAmI].data.reference;
                self.updateData();
            }
        }


        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusLowerCaseValidator', otusLowerCaseValidator);

    otusLowerCaseValidator.$inject = [
        'LowerCaseValidatorWidgetFactory'
    ];

    function otusLowerCaseValidator(LowerCaseValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/lower-case/lower-case-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = LowerCaseValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerCaseValidatorWidgetFactory', LowerCaseValidatorWidgetFactory);

    function LowerCaseValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new LowerCaseValidator(scope, element);
        }

        return self;
    }

    function LowerCaseValidator(scope, element) {
        var self = this;
        var whoAmI = 'lowerCase';


        /* Public Methods */
        self.data = true;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusInValidator', otusInValidator);

    otusInValidator.$inject = [
        'InValidatorWidgetFactory'
    ];

    function otusInValidator(InValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/in/in-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = InValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('InValidatorWidgetFactory', InValidatorWidgetFactory);

    function InValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new InValidator(scope, element);
        }

        return self;
    }

    function InValidator(scope, element) {
        var self = this;
        var whoAmI = 'in';


        /* Public Methods */
        self.data = {
            'initial': null,
            'end': null
        };
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusLowerLimitValidator', otusLowerLimitValidator);

        otusLowerLimitValidator.$inject=[
          'LowerLimitValidatorWidgetFactory'
        ];

    function otusLowerLimitValidator(LowerLimitValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/lower-limit/lower-limit-validator.html',
            link: function linkFunc(scope, element) {
               scope.widget = LowerLimitValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerLimitValidatorWidgetFactory', LowerLimitValidatorWidgetFactory);

    function LowerLimitValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new LowerLimitValidator(scope, element);
        }

        return self;
    }

    function LowerLimitValidator(scope, element) {
        var self = this;
        var whoAmI = 'lowerLimit';


        /* Public Methods */
        self.data = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMandatoryValidator', otusMandatoryValidator);

    otusMandatoryValidator.$inject = [
        'MandatoryValidatorWidgetFactory'
    ];

    function otusMandatoryValidator(MandatoryValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/mandatory/mandatory-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MandatoryValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MandatoryValidatorWidgetFactory', MandatoryValidatorWidgetFactory);

    function MandatoryValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MandatoryValidator(scope, element);
        }

        return self;
    }

    function MandatoryValidator(scope, element) {
        var self = this;
        var whoAmI = 'mandatory';

        /* Public Methods */
        self.data;
        self.updateData = updateData;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxDateValidator', otusMaxDateValidator);

    otusMaxDateValidator.$inject = [
        'MaxDateValidatorWidgetFactory'
    ];

    function otusMaxDateValidator(MaxDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-date/max-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MaxDateValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxDateValidatorWidgetFactory', MaxDateValidatorWidgetFactory);

    function MaxDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MaxDateValidator(scope, element);
        }

        return self;
    }

    function MaxDateValidator(scope, element) {
        var self = this;
        var whoAmI = 'maxDate';


        /* Public Methods */
        self.data = new Date();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = new Date(question.fillingRules.options[whoAmI].data.reference);
            updateData();
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusMaxSelectedValidator', Directive);

  Directive.$inject = [
    'otusjs.studio.editor.ui.validation.MaxSelectedValidatorWidgetFactory'
  ];

  function Directive(MaxSelectedValidatorWidgetFactory) {
    var ddo = {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/editor/ui/validation/require/max-selected/max-selected-validator.html',
      link: function linkFunc(scope, element) {
        scope.widget = MaxSelectedValidatorWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('otusjs.studio.editor.ui.validation.MaxSelectedValidatorWidgetFactory', Factory);

  function Factory() {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new MaxSelectedValidator(scope, element);
    }

    return self;
  }

  function MaxSelectedValidator(scope, element) {
    var self = this;
    var whoAmI = 'maxSelected';

    /* Public Methods */
    self.data = null;
    self.updateData = updateData;
    self.deleteValidator = deleteValidator;

    var question = scope.$parent.widget.getItem();

    _init();

    function _init() {
      self.data = question.fillingRules.options[whoAmI].data.reference;
    }

    function updateData() {
      getRuleType().data.reference = self.data;
      scope.$parent.widget.updateFillingRules();
    }

    function getRuleType() {
      return question.fillingRules.options[whoAmI];
    }

    function deleteValidator() {
      scope.$parent.widget.deleteValidator(whoAmI);
      element.remove();
      scope.$destroy();
    }

  }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxLengthValidator', otusMaxLengthValidator);

    otusMaxLengthValidator.$inject = [
        'MaxLengthValidatorWidgetFactory'
    ];

    function otusMaxLengthValidator(MaxLengthValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-length/max-length-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MaxLengthValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxLengthValidatorWidgetFactory', MaxLengthValidatorWidgetFactory);

    function MaxLengthValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MaxLengthValidator(scope, element);
        }

        return self;
    }

    function MaxLengthValidator(scope, element) {
        var self = this;
        var whoAmI = 'maxLength';


        /* Public Methods */
        self.data = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxTimeValidator', otusMaxTimeValidator);

    otusMaxTimeValidator.$inject = [
        'MaxTimeValidatorWidgetFactory'
    ];

    function otusMaxTimeValidator(MaxTimeValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-time/max-time-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MaxTimeValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxTimeValidatorWidgetFactory', MaxTimeValidatorWidgetFactory);

    function MaxTimeValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MaxTimeValidator(scope, element);
        }

        return self;
    }

    function MaxTimeValidator(scope, element) {
        var self = this;
        var whoAmI = 'maxTime';


        /* Public Methods */
        self.data = new Date();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var referenceValue = question.fillingRules.options[whoAmI].data.reference;
            if (referenceValue !== '') {
              self.data = new Date(referenceValue);
            }
            else {
              self.data.setHours('01');
              self.data.setMinutes('00');
              self.data.setSeconds('00');
              self.data.setMilliseconds('00');
            }
            self.updateData();
        }

        function updateData() {
            if (self.data) {
                getRuleType().data.reference = self.data.toString();
                scope.$parent.widget.updateFillingRules();
            }
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinDateValidator', otusMinDateValidator);

    otusMinDateValidator.$inject = [
        'MinDateValidatorWidgetFactory'
    ];

    function otusMinDateValidator(MinDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-date/min-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MinDateValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinDateValidatorWidgetFactory', MinDateValidatorWidgetFactory);

    function MinDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MinDateValidator(scope, element);
        }

        return self;
    }

    function MinDateValidator(scope, element) {
        var self = this;
        var whoAmI = 'minDate';

        /* Public Methods */
        self.data = new Date().toLocaleDateString();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;


        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            self.data = new Date(avaiableRules[whoAmI].data.reference);
            self.updateData();
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinLengthValidator', otusMinLengthValidator);

    otusMinLengthValidator.$inject = [
        'MinLengthValidatorWidgetFactory'
    ];

    function otusMinLengthValidator(MinLengthValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-length/min-length-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MinLengthValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinLengthValidatorWidgetFactory', MinLengthValidatorWidgetFactory);

    function MinLengthValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MinLengthValidator(scope, element);
        }

        return self;
    }

    function MinLengthValidator(scope, element) {
        var self = this;
        var whoAmI = 'minLength';


        /* Public Methods */
        self.data = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusMinSelectedValidator', Directive);

  Directive.$inject = [
    'otusjs.studio.editor.ui.validation.MinSelectedValidatorWidgetFactory'
  ];

  function Directive(MinSelectedValidatorWidgetFactory) {
    var ddo = {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/editor/ui/validation/require/min-selected/min-selected-validator.html',
      link: function linkFunc(scope, element) {
        scope.widget = MinSelectedValidatorWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('otusjs.studio.editor.ui.validation.MinSelectedValidatorWidgetFactory', Factory);

  function Factory() {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new MinSelectedValidator(scope, element);
    }

    return self;
  }

  function MinSelectedValidator(scope, element) {
    var self = this;
    var whoAmI = 'minSelected';

    /* Public Methods */
    self.data = null;
    self.updateData = updateData;
    self.deleteValidator = deleteValidator;

    var question = scope.$parent.widget.getItem();

    _init();

    function _init() {
      self.data = question.fillingRules.options[whoAmI].data.reference;
    }

    function updateData() {
      getRuleType().data.reference = self.data;
      scope.$parent.widget.updateFillingRules();
    }

    function getRuleType() {
      return question.fillingRules.options[whoAmI];
    }

    function deleteValidator() {
      scope.$parent.widget.deleteValidator(whoAmI);
      element.remove();
      scope.$destroy();
    }

  }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMinTimeValidator', otusMinTimeValidator);

    otusMinTimeValidator.$inject = [
        'MinTimeValidatorWidgetFactory'
    ];

    function otusMinTimeValidator(MinTimeValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/min-time/min-time-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MinTimeValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinTimeValidatorWidgetFactory', MinTimeValidatorWidgetFactory);

    function MinTimeValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MinTimeValidator(scope, element);
        }

        return self;
    }

    function MinTimeValidator(scope, element) {
        var self = this;
        var whoAmI = 'minTime';


        /* Public Methods */
        self.data = new Date("Fri Mar 25 2015 09:56:24 GMT+0100 (Tokyo Time)");
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var referenceValue = question.fillingRules.options[whoAmI].data.reference;
            if (referenceValue !== '') {
              self.data = new Date(referenceValue);
            }
            else {
              self.data.setHours('01');
              self.data.setMinutes('00');
              self.data.setSeconds('00');
              self.data.setMilliseconds('00');
            }
            self.updateData();
        }

        function updateData() {
            if (self.data) {
                getRuleType().data.reference = self.data.toString();
                scope.$parent.widget.updateFillingRules();
            }
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusParameterValidator', otusParameterValidator);

    otusParameterValidator.$inject = [
        'ParameterValidatorWidgetFactory'
    ];

    function otusParameterValidator(ParameterValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/parameter/parameter-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = ParameterValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ParameterValidatorWidgetFactory', ParameterValidatorWidgetFactory);

    function ParameterValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new ParameterValidator(scope, element);
        }

        return self;
    }

    function ParameterValidator(scope, element) {
        var self = this;
        var whoAmI = 'parameter';


        /* Public Methods */
        self.data = '';
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            if (avaiableRules.hasOwnProperty(whoAmI)) {
                self.data = avaiableRules[whoAmI].data.reference;
            }
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPastDateValidator', otusPastDateValidator);

    otusPastDateValidator.$inject = [
        'PastDateValidatorWidgetFactory'
    ];

    function otusPastDateValidator(PastDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/past-date/past-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = PastDateValidatorWidgetFactory.create(scope, element)
            }

        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PastDateValidatorWidgetFactory', PastDateValidatorWidgetFactory);

    function PastDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new PastDateValidator(scope, element);
        }

        return self;
    }

    function PastDateValidator(scope, element) {
        var self = this;
        var whoAmI = 'pastDate';


        /* Public Methods */
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            self.data = question.fillingRules.options[whoAmI].data.reference;
            self.updateData();
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPrecisionValidator', otusPrecisionValidator);

    otusPrecisionValidator.$inject = [
        'PrecisionValidatorWidgetFactory'
    ];

    function otusPrecisionValidator(PrecisionValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/precision/precision-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = PrecisionValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PrecisionValidatorWidgetFactory', PrecisionValidatorWidgetFactory);

    function PrecisionValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new PrecisionValidator(scope, element);
        }

        return self;
    }

    function PrecisionValidator(scope, element) {
        var self = this;
        var whoAmI = 'precision';


        /* Public Methods */
        self.data = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusQuantityValidator', Directive);

  Directive.$inject = [
    'otusjs.studio.editor.ui.validation.QuantityValidatorWidgetFactory'
  ];

  function Directive(QuantityValidatorWidgetFactory) {
    var ddo = {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/editor/ui/validation/require/quantity/quantity-validator.html',
      link: function linkFunc(scope, element) {
        scope.widget = QuantityValidatorWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('otusjs.studio.editor.ui.validation.QuantityValidatorWidgetFactory', Factory);

  function Factory() {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new QuantityValidator(scope, element);
    }

    return self;
  }

  function QuantityValidator(scope, element) {
    var self = this;
    var whoAmI = 'quantity';

    /* Public Methods */
    self.data = null;
    self.updateData = updateData;
    self.deleteValidator = deleteValidator;

    var question = scope.$parent.widget.getItem();

    _init();

    function _init() {
      self.data = question.fillingRules.options[whoAmI].data.reference;
    }

    function updateData() {
      getRuleType().data.reference = self.data;
      scope.$parent.widget.updateFillingRules();
    }

    function getRuleType() {
      return question.fillingRules.options[whoAmI];
    }

    function deleteValidator() {
      scope.$parent.widget.deleteValidator(whoAmI);
      element.remove();
      scope.$destroy();
    }

  }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRangeDateValidator', otusRangeDateValidator);

    otusRangeDateValidator.$inject = [
        'RangeDateValidatorWidgetFactory'
    ];

    function otusRangeDateValidator(RangeDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/range-date/range-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = RangeDateValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RangeDateValidatorWidgetFactory', RangeDateValidatorWidgetFactory);

    function RangeDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new RangeDateValidator(scope, element);
        }

        return self;
    }

    function RangeDateValidator(scope, element) {
        var self = this;
        var whoAmI = 'rangeDate';


        /* Public Methods */
        self.data = {
            'initial': new Date(),
            'end': new Date()
        };
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            self.data['initial'] = new Date(avaiableRules[whoAmI].data.reference['initial']);
            self.data['end'] = new Date(avaiableRules[whoAmI].data.reference['end']);
            self.updateData();
        }

        function updateData() {
            getRuleType().data.reference['initial'] = self.data['initial'];
            getRuleType().data.reference['end'] = self.data['end'];
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusScaleValidator', otusScaleValidator);

    otusScaleValidator.$inject = [
        'ScaleValidatorWidgetFactory'
    ];

    function otusScaleValidator(ScaleValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/scale/scale-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = ScaleValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ScaleValidatorWidgetFactory', ScaleValidatorWidgetFactory);

    function ScaleValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new ScaleValidator(scope, element);
        }

        return self;
    }

    function ScaleValidator(scope, element) {
        var self = this;
        var whoAmI = 'scale';


        /* Public Methods */
        self.data = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            self.data = avaiableRules[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSpecialsValidator', otusSpecialsValidator);

    otusSpecialsValidator.$inject = [
        'SpecialsValidatorWidgetFactory'
    ];

    function otusSpecialsValidator(SpecialsValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/specials/specials-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = SpecialsValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SpecialsValidatorWidgetFactory', SpecialsValidatorWidgetFactory);

    function SpecialsValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new SpecialsValidator(scope, element);
        }

        return self;
    }

    function SpecialsValidator(scope, element) {
        var self = this;
        var whoAmI = 'specials';


        /* Public Methods */
        self.data = true;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            self.data = avaiableRules[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusUpperCaseValidator', otusUpperCaseValidator);

    otusUpperCaseValidator.$inject = [
        'UpperCaseValidatorWidgetFactory'
    ];

    function otusUpperCaseValidator(UpperCaseValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/upper-case/upper-case-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = UpperCaseValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UpperCaseValidatorWidgetFactory', UpperCaseValidatorWidgetFactory);

    function UpperCaseValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new UpperCaseValidator(scope, element);
        }

        return self;
    }

    function UpperCaseValidator(scope, element) {
        var self = this;
        var whoAmI = 'upperCase';


        /* Public Methods */
        self.data = true;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            self.data = avaiableRules[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusUpperLimitValidator', otusUpperLimitValidator);

    otusUpperLimitValidator.$inject = [
        'UpperLimitValidatorWidgetFactory'
    ];

    function otusUpperLimitValidator(UpperLimitValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/upper-limit/upper-limit-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = UpperLimitValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UpperLimitValidatorWidgetFactory', UpperLimitValidatorWidgetFactory);

    function UpperLimitValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new UpperLimitValidator(scope, element);
        }

        return self;
    }

    function UpperLimitValidator(scope, element) {
        var self = this;
        var whoAmI = 'upperLimit';


        /* Public Methods */
        self.data = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            self.data = avaiableRules[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());

(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('singleSelectionQuestion', directive);

  directive.$inject = [
    'SingleSelectionQuestionWidgetFactory'
  ];

  function directive(SingleSelectionQuestionWidgetFactory) {
    var ddo = {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/editor/ui/survey-item/question/single-selection/group/single-selection-question.html',
      link: function linkFunc(scope) {
        scope.widget = scope.$parent.widget;
      }
    };

    return ddo;
  }

}());
(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

  SingleSelectionQuestionWidgetFactory.$inject = [
    'AddAnswerOptionEventFactory',
    'RemoveAnswerOptionEventFactory',
    'AnswerOptionFactory'
  ];

  function SingleSelectionQuestionWidgetFactory(AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory, AnswerOptionFactory) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new SingleSelectionQuestionWidget(scope, element, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory, AnswerOptionFactory);
    }

    return self;
  }

  function SingleSelectionQuestionWidget(scope, element, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory, AnswerOptionFactory) {
    var self = this;

    /* Public methods */
    self.getClassName = getClassName;
    self.getUUID = getUUID;
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItem = getItem;
    self.getTemplate = getTemplate;
    self.addOption = addOption;
    self.removeLastOption = removeLastOption;
    self.isAvailableExtractionValue = isAvailableExtractionValue;

    _init();

    function _init() {
      if (self.getItem().options.length > 0) {
        _loadAnswerOptions();
      }
    }

    function getClassName() {
      return 'SingleSelectionQuestionWidget';
    }

    function getUUID() {
      return scope.uuid;
    }

    function getElement() {
      return element;
    }

    function getParent() {
      return scope.$parent.widget;
    }

    function getItem() {
      return getParent().getItem();
    }

    function getTemplate() {
      return '<single-selection-question></single-selection-question>';
    }

    function addOption() {
      var newOption = AddAnswerOptionEventFactory.create().execute(self);
    }

    // TODO: This method won't be necessary when the loading mode be refactored!
    function _loadAnswerOptions() {
      var clonedArray = angular.copy(self.getItem().options);
      self.getItem().options = [];

      clonedArray.forEach(function(answerOption) {
        var loadedAnswerOption = AnswerOptionFactory.fromJsonObject(answerOption);
        self.getItem().options.push(loadedAnswerOption);
      });
    }

    function removeLastOption() {
      RemoveAnswerOptionEventFactory.create().execute(self);
    }

    function isAvailableExtractionValue($event) {
      return self.getItem().isAvailableExtractionValue($event.newValue);
    }
  }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('AnswerOptionWidgetFactory', AnswerOptionWidgetFactory);

    function AnswerOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentGroup) {
            return new AnswerOptionWidget(option, parentGroup);
        }

        return self;
    }

    function AnswerOptionWidget(option, parentGroup) {
        var self = this;

        self.name = 'AnswerOption';
        self.parentGroup = parentGroup;
        self.option = option;
    }

}());
