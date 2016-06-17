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
            /* Otus platform modules */
            'ui.components',
            'utils'
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
        'otusDomainClient'
    ]);

}());

(function() {

    angular
        .module('studio')
        .config(['$mdDateLocaleProvider', localeConfiguration]);

    function localeConfiguration($mdDateLocaleProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD/MM/YYYY');
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

    }

}());

(function() {

    angular
        .module('studio')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'SURVEY_FORMS': 'survey-forms',
            'EDITOR': 'editor',
            'LOGIN': 'login'
        });

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        var dashboardMenu = 'app/dashboard/menu/dashboard-menu.html';

        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    'system-wrap' : {
                        templateUrl: 'app/authenticator/login.html',
                        controller: 'LoginController as loginController'
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
                                 //SurveyEditorService.startEditor({name: 'DEV Environment', acronym: 'DEV'});
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
            }).warnPalette('red');


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

    angular.module('preview', [
        'preview.navigation'
    ]);

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
            var authenticatorResource = RestResourceService.getAuthenticatorResource();
            LogoutDialogService.showDialog()
                .onConfirm(function() {
                    authenticatorResource.invalidate(function(response) {
                        $window.sessionStorage.clear();
                        DashboardStateService.logout();
                    });
                });
        }

        function login(user) {
            RestResourceService.setHostname(user.domain);
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
        self.goToSurveyForms = goToSurveyForms;
        self.goToEditor = goToEditor;
        self.logout = logout;

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

        function goToSurveyForms() {
            self.currentState = 'SurveyForms';
            $state.go(APP_STATE.SURVEY_FORMS);
        }

        function goToEditor() {
            self.currentState = 'Edição de Formulário';
            $state.go(APP_STATE.EDITOR);
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
        self.openSurveyForms = openSurveyForms;
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

        function openSurveyForms() {
            DashboardStateService.goToSurveyForms();
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
        .module('editor')
        .service('SurveyEditorService', SurveyEditorService);

    SurveyEditorService.$inject = ['WorkspaceService'];

    function SurveyEditorService(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.startEditor = startEditor;

        function startEditor(initializationData) {
            WorkspaceService.initializeWorkspace({
                owner: 'user'
            });
            WorkspaceService.startNewWork(initializationData);
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
            window.indexedDB.deleteDatabase('otus-studio');
            $indexedDBProvider
                .connection('otus-studio')
                .upgradeDatabase(1, function(event, db, tx) {
                    var store = db.createObjectStore('survey_template', { keyPath: 'template_oid' });
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
        .module('preview.navigation')
        .factory('GraphFactory', GraphFactory);

    /* Factory interface */
    function GraphFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new Graph();
        }

        return self;
    }

}());

(function() {
    'use strict';

    var DOM_LOCATION_NAVEGATION_GRAPH = '#survey-navigation-graph > svg:nth-child(1)';

    angular
        .module('preview.navigation')
        .directive('surveyNavigationPreviewGenerator', surveyNavigationPreviewGenerator);

    surveyNavigationPreviewGenerator.$inject = [
        'NavigationPreviewService',
        'WorkspaceService'
    ];

    function surveyNavigationPreviewGenerator(NavigationPreviewService, WorkspaceService) {

        function link(scope, element, attrs) {
            element.on('click', function(){
                if(element.find(DOM_LOCATION_NAVEGATION_GRAPH)){
                    $(DOM_LOCATION_NAVEGATION_GRAPH).remove();
                }
                var navigationObject = WorkspaceService.getSurvey().NavigationManager.getNavigationList();
                var createdGraph = NavigationPreviewService.createGraph(navigationObject);
                NavigationPreviewService.renderGraph(createdGraph);
            });
        }

        var ddo =  {
            restrict : 'A',
            link : link
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular.module('preview.navigation', []);

}());

(function(){"use strict";var __slice=[].slice;angular.module("indexedDB",[]).provider("$indexedDB",function(){var IDBKeyRange,allTransactions,apiDirection,appendResultsToPromise,applyNeededUpgrades,cursorDirection,db,dbMode,dbName,dbPromise,dbVersion,defaultQueryOptions,errorMessageFor,indexedDB,readyState,upgradesByVersion;indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,IDBKeyRange=window.IDBKeyRange||window.mozIDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange,dbMode={readonly:"readonly",readwrite:"readwrite"},readyState={pending:"pending"},cursorDirection={next:"next",nextunique:"nextunique",prev:"prev",prevunique:"prevunique"},apiDirection={ascending:cursorDirection.next,descending:cursorDirection.prev},dbName="",dbVersion=1,db=null,upgradesByVersion={},dbPromise=null,allTransactions=[],defaultQueryOptions={useIndex:void 0,keyRange:null,direction:cursorDirection.next},applyNeededUpgrades=function(oldVersion,event,db,tx,$log){var version;for(version in upgradesByVersion)!upgradesByVersion.hasOwnProperty(version)||oldVersion>=version||($log.log("$indexedDB: Running upgrade : "+version+" from "+oldVersion),upgradesByVersion[version](event,db,tx))},errorMessageFor=function(e){return e.target.readyState===readyState.pending?"Error: Operation pending":e.target.webkitErrorMessage||e.target.error.message||e.target.errorCode},appendResultsToPromise=function(promise,results){return void 0!==results?promise.then(function(){return results}):promise},this.connection=function(databaseName){return dbName=databaseName,this},this.upgradeDatabase=function(newVersion,callback){return upgradesByVersion[newVersion]=callback,dbVersion=Math.max.apply(null,Object.keys(upgradesByVersion)),this},this.$get=["$q","$rootScope","$log",function($q,$rootScope,$log){var DbQ,ObjectStore,Query,Transaction,addTransaction,closeDatabase,createDatabaseConnection,keyRangeForOptions,openDatabase,openTransaction,rejectWithError,validateStoreNames;return rejectWithError=function(deferred){return function(error){return $rootScope.$apply(function(){return deferred.reject(errorMessageFor(error))})}},createDatabaseConnection=function(){var dbReq,deferred;return deferred=$q.defer(),dbReq=indexedDB.open(dbName,parseInt(dbVersion)||1),dbReq.onsuccess=function(){db=dbReq.result,$rootScope.$apply(function(){deferred.resolve(db)})},dbReq.onblocked=dbReq.onerror=rejectWithError(deferred),dbReq.onupgradeneeded=function(event){var tx;db=event.target.result,tx=event.target.transaction,$log.log("$indexedDB: Upgrading database '"+db.name+"' from version "+event.oldVersion+" to version "+event.newVersion+" ..."),applyNeededUpgrades(event.oldVersion,event,db,tx,$log)},deferred.promise},openDatabase=function(){return dbPromise||(dbPromise=createDatabaseConnection())},closeDatabase=function(){return openDatabase().then(function(){return db.close(),db=null,dbPromise=null})},validateStoreNames=function(storeNames){var found,storeName,_i,_len;for(found=!0,_i=0,_len=storeNames.length;_len>_i;_i++)storeName=storeNames[_i],found&=db.objectStoreNames.contains(storeName);return found},openTransaction=function(storeNames,mode){return null==mode&&(mode=dbMode.readonly),openDatabase().then(function(){return validateStoreNames(storeNames)?new Transaction(storeNames,mode):$q.reject("Object stores "+storeNames+" do not exist.")})},keyRangeForOptions=function(options){return options.beginKey&&options.endKey?IDBKeyRange.bound(options.beginKey,options.endKey):void 0},addTransaction=function(transaction){return allTransactions.push(transaction.promise),transaction.promise["finally"](function(){var index;return index=allTransactions.indexOf(transaction.promise),index>-1?allTransactions.splice(index,1):void 0})},Transaction=function(){function Transaction(storeNames,mode){null==mode&&(mode=dbMode.readonly),this.transaction=db.transaction(storeNames,mode),this.defer=$q.defer(),this.promise=this.defer.promise,this.setupCallbacks()}return Transaction.prototype.setupCallbacks=function(){return this.transaction.oncomplete=function(_this){return function(){return $rootScope.$apply(function(){return _this.defer.resolve("Transaction Completed")})}}(this),this.transaction.onabort=function(_this){return function(error){return $rootScope.$apply(function(){return _this.defer.reject("Transaction Aborted",error)})}}(this),this.transaction.onerror=function(_this){return function(error){return $rootScope.$apply(function(){return _this.defer.reject("Transaction Error",error)})}}(this),addTransaction(this)},Transaction.prototype.objectStore=function(storeName){return this.transaction.objectStore(storeName)},Transaction.prototype.abort=function(){return this.transaction.abort()},Transaction}(),DbQ=function(){function DbQ(){this.q=$q.defer(),this.promise=this.q.promise}return DbQ.prototype.reject=function(){var args;return args=1<=arguments.length?__slice.call(arguments,0):[],$rootScope.$apply(function(_this){return function(){var _ref;return(_ref=_this.q).reject.apply(_ref,args)}}(this))},DbQ.prototype.rejectWith=function(req){return req.onerror=req.onblocked=function(_this){return function(e){return _this.reject(errorMessageFor(e))}}(this)},DbQ.prototype.resolve=function(){var args;return args=1<=arguments.length?__slice.call(arguments,0):[],$rootScope.$apply(function(_this){return function(){var _ref;return(_ref=_this.q).resolve.apply(_ref,args)}}(this))},DbQ.prototype.notify=function(){var args;return args=1<=arguments.length?__slice.call(arguments,0):[],$rootScope.$apply(function(_this){return function(){var _ref;return(_ref=_this.q).notify.apply(_ref,args)}}(this))},DbQ.prototype.dbErrorFunction=function(){return function(_this){return function(error){return $rootScope.$apply(function(){return _this.q.reject(errorMessageFor(error))})}}(this)},DbQ.prototype.resolveWith=function(req){return this.rejectWith(req),req.onsuccess=function(_this){return function(e){return _this.resolve(e.target.result)}}(this)},DbQ}(),ObjectStore=function(){function ObjectStore(storeName,transaction){this.storeName=storeName,this.store=transaction.objectStore(storeName),this.transaction=transaction}return ObjectStore.prototype.defer=function(){return new DbQ},ObjectStore.prototype._mapCursor=function(defer,mapFunc,req){var results;return null==req&&(req=this.store.openCursor()),results=[],defer.rejectWith(req),req.onsuccess=function(e){var cursor;return(cursor=e.target.result)?(results.push(mapFunc(cursor)),defer.notify(mapFunc(cursor)),cursor["continue"]()):defer.resolve(results)}},ObjectStore.prototype._arrayOperation=function(data,mapFunc){var defer,item,req,results,_i,_len;for(defer=this.defer(),angular.isArray(data)||(data=[data]),_i=0,_len=data.length;_len>_i;_i++)item=data[_i],req=mapFunc(item),results=[],defer.rejectWith(req),req.onsuccess=function(e){return results.push(e.target.result),defer.notify(e.target.result),results.length>=data.length?defer.resolve(results):void 0};return 0===data.length?$q.when([]):defer.promise},ObjectStore.prototype.getAllKeys=function(){var defer,req;return defer=this.defer(),this.store.getAllKeys?(req=this.store.getAllKeys(),defer.resolveWith(req)):this._mapCursor(defer,function(cursor){return cursor.key}),defer.promise},ObjectStore.prototype.clear=function(){var defer,req;return defer=this.defer(),req=this.store.clear(),defer.resolveWith(req),defer.promise},ObjectStore.prototype["delete"]=function(key){var defer;return defer=this.defer(),defer.resolveWith(this.store["delete"](key)),defer.promise},ObjectStore.prototype.upsert=function(data){return this._arrayOperation(data,function(_this){return function(item){return _this.store.put(item)}}(this))},ObjectStore.prototype.insert=function(data){return this._arrayOperation(data,function(_this){return function(item){return _this.store.add(item)}}(this))},ObjectStore.prototype.getAll=function(){var defer;return defer=this.defer(),this.store.getAll?defer.resolveWith(this.store.getAll()):this._mapCursor(defer,function(cursor){return cursor.value}),defer.promise},ObjectStore.prototype.eachWhere=function(query){var defer,direction,indexName,keyRange,req;return defer=this.defer(),indexName=query.indexName,keyRange=query.keyRange,direction=query.direction,req=indexName?this.store.index(indexName).openCursor(keyRange,direction):this.store.openCursor(keyRange,direction),this._mapCursor(defer,function(cursor){return cursor.value},req),defer.promise},ObjectStore.prototype.findWhere=function(query){return this.eachWhere(query)},ObjectStore.prototype.each=function(options){return null==options&&(options={}),this.eachBy(void 0,options)},ObjectStore.prototype.eachBy=function(indexName,options){var q;return null==indexName&&(indexName=void 0),null==options&&(options={}),q=new Query,q.indexName=indexName,q.keyRange=keyRangeForOptions(options),q.direction=options.direction||defaultQueryOptions.direction,this.eachWhere(q)},ObjectStore.prototype.count=function(){var defer;return defer=this.defer(),defer.resolveWith(this.store.count()),defer.promise},ObjectStore.prototype.find=function(key){var defer,req;return defer=this.defer(),req=this.store.get(key),defer.rejectWith(req),req.onsuccess=function(_this){return function(e){return e.target.result?defer.resolve(e.target.result):defer.reject(""+_this.storeName+":"+key+" not found.")}}(this),defer.promise},ObjectStore.prototype.findBy=function(index,key){var defer;return defer=this.defer(),defer.resolveWith(this.store.index(index).get(key)),defer.promise},ObjectStore.prototype.query=function(){return new Query},ObjectStore}(),Query=function(){function Query(){this.indexName=void 0,this.keyRange=void 0,this.direction=cursorDirection.next}return Query.prototype.$lt=function(value){return this.keyRange=IDBKeyRange.upperBound(value,!0),this},Query.prototype.$gt=function(value){return this.keyRange=IDBKeyRange.lowerBound(value,!0),this},Query.prototype.$lte=function(value){return this.keyRange=IDBKeyRange.upperBound(value),this},Query.prototype.$gte=function(value){return this.keyRange=IDBKeyRange.lowerBound(value),this},Query.prototype.$eq=function(value){return this.keyRange=IDBKeyRange.only(value),this},Query.prototype.$between=function(low,hi,exLow,exHi){return null==exLow&&(exLow=!1),null==exHi&&(exHi=!1),this.keyRange=IDBKeyRange.bound(low,hi,exLow,exHi),this},Query.prototype.$desc=function(unique){return this.direction=unique?cursorDirection.prevunique:cursorDirection.prev,this},Query.prototype.$asc=function(unique){return this.direction=unique?cursorDirection.nextunique:cursorDirection.next,this},Query.prototype.$index=function(indexName){return this.indexName=indexName,this},Query}(),{openStore:function(storeName,callBack,mode){return null==mode&&(mode=dbMode.readwrite),openTransaction([storeName],mode).then(function(transaction){var results;return results=callBack(new ObjectStore(storeName,transaction)),appendResultsToPromise(transaction.promise,results)})},openStores:function(storeNames,callback,mode){return null==mode&&(mode=dbMode.readwrite),openTransaction(storeNames,mode).then(function(transaction){var objectStores,results,storeName;return objectStores=function(){var _i,_len,_results;for(_results=[],_i=0,_len=storeNames.length;_len>_i;_i++)storeName=storeNames[_i],_results.push(new ObjectStore(storeName,transaction));return _results}(),results=callback.apply(null,objectStores),appendResultsToPromise(transaction.promise,results)})},openAllStores:function(callback,mode){return null==mode&&(mode=dbMode.readwrite),openDatabase().then(function(_this){return function(){var objectStores,results,storeName,storeNames,transaction;return storeNames=Array.prototype.slice.apply(db.objectStoreNames),transaction=new Transaction(storeNames,mode),objectStores=function(){var _i,_len,_results;for(_results=[],_i=0,_len=storeNames.length;_len>_i;_i++)storeName=storeNames[_i],_results.push(new ObjectStore(storeName,transaction));return _results}(),results=callback.apply(null,objectStores),appendResultsToPromise(transaction.promise,results)}}(this))},closeDatabase:function(){return closeDatabase()},deleteDatabase:function(){return closeDatabase().then(function(){var defer;return defer=new DbQ,defer.resolveWith(indexedDB.deleteDatabase(dbName)),defer.promise})["finally"](function(){return $log.log("$indexedDB: "+dbName+" database deleted.")})},queryDirection:apiDirection,flush:function(){return allTransactions.length>0?$q.all(allTransactions):$q.when([])},databaseInfo:function(){return openDatabase().then(function(){var storeNames,transaction;return transaction=null,storeNames=Array.prototype.slice.apply(db.objectStoreNames),openTransaction(storeNames,dbMode.readonly).then(function(transaction){var store,storeName,stores;return stores=function(){var _i,_len,_results;for(_results=[],_i=0,_len=storeNames.length;_len>_i;_i++)storeName=storeNames[_i],store=transaction.objectStore(storeName),_results.push({name:storeName,keyPath:store.keyPath,autoIncrement:store.autoIncrement,indices:Array.prototype.slice.apply(store.indexNames)});return _results}(),transaction.promise.then(function(){return{name:db.name,version:db.version,objectStores:stores}})})})}}}]})}).call(this);
//# sourceMappingURL=angular-indexed-db.min.js.map

(function() {
    'use strict';

    angular
        .module('ui.components')
        .directive('textEditionMenu', textEditionMenu);

    function textEditionMenu() {
        var ddo = {
            templateUrl: 'app/shared/text-edition-menu/text-edition-menu-template.html',
            retrict: 'E',
            link: linkFunc
        };

        return ddo;
    }

    function linkFunc(scope, element, attrs) {
        scope.bold = bold;
        scope.italic = italic;
        scope.underlined = underlined;
        scope.strikeThrough = strikeThrough;

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
    }
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
                onConfirm: function onConfirm(callback) {
                    self.callback = callback;
                }
            };
        }

        function forwardSuccessfulExecution(response) {
            if (response.action == 'confirm') {
                if (self.callback) self.callback(response.data);
            }
        }

        function forwardUnsuccessfulExecution(error) {
            //TODO
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
        'AddSurveyItemService'
    ];

    function AddSurveyItemEventFactory($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService);
        }

        return self;
    }

    function AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService) {
        var self = this;

        self.execute = execute;

        function execute(itemType) {
            var item = AddSurveyItemService.execute(itemType, WorkspaceService.getSurvey());
            SheetContentService.loadQuestion(item);
            $rootScope.$broadcast('item.add', item);
            WorkspaceService.workspace.currentItem = item;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
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
        .factory('UpdateQuestionEventFactory', UpdateQuestionEventFactory);

    UpdateQuestionEventFactory.$inject = [
        'SheetContentService',
        'WorkspaceService'
    ];

    function UpdateQuestionEventFactory(SheetContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateQuestionEvent(SheetContentService, WorkspaceService);
        }

        return self;
    }

    function UpdateQuestionEvent(SheetContentService, WorkspaceService) {
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
        '$indexedDB',
        'InsertHelperService'
    ];

    function CrossSessionDatabaseService($indexedDB, InsertHelperService) {
        var self = this;

        /* Public interface */
        self.saveSurveyTemplateRevision = saveSurveyTemplateRevision;

        function saveSurveyTemplateRevision(template, session) {
            $indexedDB.openStore('survey_template', function(store) {
                var entry = {};
                entry.template_oid = template.oid;
                entry.contributor = session.owner;
                entry.template = JSON.parse(template.toJson());
                // console.log(JSON.stringify());
                store.upsert(entry).then(function(e) {});

            });
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
                            return getModelValue(attribute, obj) == value;
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
        'MetadataOptionWidgetFactory',
        'NavigationWidgetFactory',
        'RouteEditorWidgetFactory',
        'RouteCreatorWidgetFactory'
    ];

    function WidgetService(WidgetTemplateService, SurveyItemWidgetFactory, SurveyItemEditorWidgetFactory, AnswerOptionWidgetFactory,
        MetadataGroupWidgetFactory, MetadataOptionWidgetFactory, NavigationWidgetFactory, RouteEditorWidgetFactory, RouteCreatorWidgetFactory) {

        var self = this;

        self.widgetMap = {};

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;
        self.getMetadataWidget = getMetadataWidget;
        self.getSurveyItemEditorWidget = getSurveyItemEditorWidget;
        self.getQuestionAnswerOptionWidget = getQuestionAnswerOptionWidget;
        self.getMetadataAnswerOptionWidget = getMetadataAnswerOptionWidget;
        self.getNavigationEditorWidget = getNavigationEditorWidget;
        self.getRouteWidget = getRouteWidget;
        self.getRouteCreatorWidget = getRouteCreatorWidget;

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

        function getNavigationEditorWidget(model) {
            return NavigationWidgetFactory.create(model);
        }

        function getRouteWidget(navigation, model) {
            return RouteEditorWidgetFactory.create(navigation, model);
        }

        function getRouteCreatorWidget(model, element) {
            var widget = RouteCreatorWidgetFactory.create(model, element);

            self.widgetMap[widget.type] = self.widgetMap[widget.type] || {};
            self.widgetMap[widget.type][widget.name.guid] = widget.name;
            self.widgetMap[widget.type][widget.destination.guid] = widget.destination;
            self.widgetMap[widget.type][widget.processor.guid] = widget.processor;
            return widget;
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
        'MainContainerContentService',
        'UiBindingService',
        '$mdBottomSheet'
    ];

    function MainContainerController($scope, MainContainerContentService, UiBindingService, $mdBottomSheet) {
        var self = this;

        self.showQuestionsMenu = showQuestionsMenu;

        init();

        function init() {
            MainContainerContentService.init(self);
        }
        UiBindingService.setScope($scope);

        function showQuestionsMenu() {
            $mdBottomSheet.show({
                templateUrl: 'app/editor/ui/survey-item-palette/bottom-sheet.html',
                //disableBackdrop: true,
                disableParentScroll: false
            });
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SheetContentService', SheetContentService);

    SheetContentService.$inject = [
        'editor.ui.mpath',
        'TemplateLoaderService'
    ];

    function SheetContentService(mpath, TemplateLoaderService, WidgetService) {
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
            sheet.find('#sheet').append(content);
        }

        function loadItem(item) {
            self.lastLoadedQuestion = item;
            var content = TemplateLoaderService.loadDirective('<otus:page-item-editor></otus:page-item-editor>', scope);
            sheet.find('#sheet').append(content);
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
        'SheetContentService'
    ];

    function SheetController($scope, $element, SheetContentService) {
        var self = this;
        SheetContentService.init($scope, $element);
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSheet', otusSheet);

    function otusSheet() {
        var ddo = {
            restrict: 'E',
            controller: 'SheetController',
            templateUrl: 'app/editor/ui/sheet/sheet.html'
        };

        return ddo;
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
        .component('otusSurveyHeader', {
            templateUrl: 'app/editor/ui/survey-header/survey-header-template.html',

            controller: function($scope, WorkspaceService) {
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
        'UUIDService'
    ];

    function directive(SurveyItemEditorWidgetFactory, SheetContentService, UUIDService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item-editor/survey-item-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                scope.widget = SurveyItemEditorWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
                element.attr('tabindex', -1).focus();
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

        function getContainer() {
            if(item.isQuestion()) {
                return '<otus:question-item></otus:question-item>';
            } else {
                return '<otus:misc-item></otus:misc-item>';
            }
        }

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
        .module('editor.workspace')
        .service('SurveyLoaderService', SurveyLoaderService);

    SurveyLoaderService.$inject = ['ModelFacadeService'];

    function SurveyLoaderService(ModelFacadeService) {
        var self = this;

        /* Public interface */
        self.newSurvey = newSurvey;

        /* Public interface implementation */
        function newSurvey(name, acronym, version) {
            return ModelFacadeService.getSurveyFactory().create(name, acronym);
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

        function loadWork() {
            var survey = SurveyLoaderService.newSurvey();
            importProject(SurveyProjectFactory.create(survey, self.workspace.sessions.workspaceOwner));
        }

        function closeWork() {
            saveProject();
            self.workspace.project.close('now');
        }

        function saveWork() {
            CrossSessionDatabaseService.saveSurveyTemplateRevision(self.workspace.project.survey, self.workspace.sessions.workspaceOwner);
        }

        function exportWork() {
            return SurveyExportService.exportSurvey(self.workspace.project.survey);
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

        function exportSurvey(template) {
            return 'data:text/json;charset=utf-8,' + encodeURIComponent(template.toJson());
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
        .module('preview.navigation')
        .service('NavigationPreviewService', NavigationPreviewService);

        NavigationPreviewService.$inject = ['GraphFactory'];

    function NavigationPreviewService(GraphFactory) {
        var self = this;

        // Public interface
        self.createGraph = createGraph;
        self.renderGraph = renderGraph;

        // Private Interface
        var navigationGraph,
        renderer,
        layouter;

        function createGraph(navigationRules) {
            init();
            iterate(navigationRules, drawNodes);
            iterate(navigationRules, drawEdges);
            draw();
            return navigationGraph;
        }

        function init() {
            navigationGraph = GraphFactory.create();
        }

        function iterate(navigationRules, drawOptions) {
            for (var navigationRule in navigationRules) {
                drawOptions(navigationRules[navigationRule]);
            }
        }

        function drawNodes(navigationRule) {
            if (navigationRule.hasOwnProperty('origin')) {
                navigationGraph.addNode(navigationRule.origin);
            }
        }

        function drawEdges(navigationRule) {
            if (navigationRule.hasOwnProperty('routes')) {
                for (var i = 0; i < navigationRule.routes.length; i++) {
                    navigationGraph.addEdge(navigationRule.origin, navigationRule.routes[i].destination, {
                        directed: true
                    });
                }
            }
        }

        function draw() {
            layouter = new Graph.Layout.Spring(navigationGraph);
            layouter.layout();
        }

        function renderGraph(createdGraph) {
           renderer = new Graph.Renderer.Raphael('survey-navigation-graph', createdGraph, $('#survey-navigation-graph').width(), $('#survey-navigation-graph').height());
           renderer.draw();
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
                templateUrl: 'app/dashboard/survey-form/dialog/new-survey-form/new-survey-form-dialog.html',
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
                onConfirm: function onConfirm(callback) {
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
            //TODO
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
            console.log(response.data.acronym);
            $mdDialog.hide(response);
        }
    }

}());

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
                label: '@',
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

        function getClassName() {
            return 'OtusTextEditorWidget';
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

        function _populateLabel() {
            self.ngModel.ptBR.formattedText = removeSpecialCharacters(event.target.innerHTML);
            self.ngModel.ptBR.plainText = event.target.innerText;
        }

        function removeSpecialCharacters(value) {
            return value.replace(/"/g, '\'');
        }

        element.on('keyup', function(event) {
            _populateLabel();
            UpdateQuestionEventFactory.create().execute(self);
            this.childNodes[0].addEventListener('blur', function() {
                _populateLabel();
                UpdateQuestionEventFactory.create().execute(self);
            });
        });
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
        'RemoveMetadataOptionEventFactory'
    ];

    function MetadataGroupWidgetFactory(MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory);
        }

        return self;
    }

    function MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
        var self = this;

        self.options = [];

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

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

        function addOption() {
            var newOption = AddMetadataAnswerEventFactory.create().execute(self);
            var optionWidget = MetadataOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function removeLastOption() {
            RemoveMetadataOptionEventFactory.create().execute(self);
            self.options.splice(-1);
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
        .directive('otusNavigationEditor', otusNavigationEditor);

    otusNavigationEditor.$inject = [
        'RouteEditorWidgetFactory',
        'NavigationWidgetFactory',
        'WorkspaceService',
        'UUIDService'
    ];

    function otusNavigationEditor(RouteEditorWidgetFactory, NavigationWidgetFactory, WorkspaceService, UUIDService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/editor/navigation-editor.html',
            link: function linkFunc(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                var NavigationManager = WorkspaceService.getSurvey().NavigationManager;
                scope.widget = NavigationWidgetFactory.create(scope, element, NavigationManager, RouteEditorWidgetFactory);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NavigationWidgetFactory', NavigationWidgetFactory);

    function NavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element, NavigationManagerService, RouteEditorWidgetFactory) {
            return new NavigationWidget(scope, element, NavigationManagerService, RouteEditorWidgetFactory);
        }

        return self;
    }

    function NavigationWidget(scope, element, NavigationManagerService, RouteEditorWidgetFactory) {
        var self = this;

        self.className = 'NavigationEditorWidget';
        self.css = {};

        var navigation = NavigationManagerService.getNavigationByOrigin(getItem().templateID);
        var routeEditorWidgets = [];
        var routeCreatorWidget = null;

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getNavigation = getNavigation;
        self.getItem = getItem;
        self.listRouteWidgets = listRouteWidgets;
        self.addRoute = addRoute;
        self.removeRoute = removeRoute;

        setupScopeEvents();

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

        function getNavigation() {
            return navigation;
        }

        function listRouteWidgets() {
            return routeEditorWidgets;
        }

        function addRoute(route) {
            var routeWidget = RouteEditorWidgetFactory.create(route, navigation);
            routeEditorWidgets.push(routeWidget);
        }

        function removeRoute(name) {
            var routeToRemove = routeEditorWidgets.filter(function(routeEditorWidget) {
                return routeEditorWidget.name() === name;
            });

            var indexToRemove = routeEditorWidgets.indexOf(routeToRemove[0]);
            if (indexToRemove > -1) routeEditorWidgets.splice(indexToRemove, 1);

            return routeToRemove[0];
        }

        //---------------------------------------------------------------------
        // Scope event definitions
        //---------------------------------------------------------------------
        var disableQuestionAddEventListener;
        var disableQuestionRemoveEventListener;

        function setupScopeEvents() {
            enableQuestionAddEventListener(disableQuestionRemoveEventListener);
            enableQuestionRemoveEventListener(getItem().templateID, disableQuestionAddEventListener);
        }

        function enableQuestionAddEventListener() {
            disableQuestionAddEventListener = scope.$on('item.add', addQuestionListener);
        }

        function enableQuestionRemoveEventListener(templateID) {
            disableQuestionRemoveEventListener = scope.$on('item.remove.' + templateID, removeQuestionListener);
        }

        function addQuestionListener(event, addedQuestion) {
            navigation = NavigationManagerService.getNavigationByOrigin(getItem().templateID);
            if (navigation) {
                // routeCreatorWidget.routeData.parentNavigation = navigation;
                addRoute(navigation.listRoutes()[0]);
                enableQuestionRemoveEventListener(addedQuestion.templateID);
                disableQuestionAddEventListener();
            }
        }

        function removeQuestionListener(event, removedQuestion) {
            routeEditorWidgets = [];
            navigation = NavigationManagerService.getNavigationByOrigin(getItem().templateID);

            if (navigation) {
                navigation.routes.forEach(function(route) {
                    addRoute(route);
                    enableQuestionRemoveEventListener(route.destination);
                });
            } else {
                enableQuestionAddEventListener();
                disableQuestionRemoveEventListener();
            }
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRouteCondition', directive);

    directive.$inject = ['RouteConditionWidgetFactory'];

    function directive(RouteConditionWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/route-condition/route-condition.html',
            link: function linkFunc(scope) {
                var route = scope.$parent.routeConditionDialog.currentRoute;
                scope.widget = RouteConditionWidgetFactory.create(route, scope.$parent.routeConditionDialog);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteConditionWidgetFactory', RouteConditionWidgetFactory);

    RouteConditionWidgetFactory.$inject = [
        'AddRouteConditionEventFactory'
    ];

    function RouteConditionWidgetFactory(AddRouteConditionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(route, parentWidget) {
            return new RouteConditionWidget(route, parentWidget, AddRouteConditionEventFactory);
        }

        return self;
    }

    function RouteConditionWidget(route, parentWidget, AddRouteConditionEventFactory) {
        var self = this;

        var GROUP_NAME_SUFIX = 'Grupo ';

        /* Type definitions */
        self.className = self.constructor.name;

        /* Instance definitions */
        self.parent = parentWidget;
        self.route = route;
        self.routeConditionName = '';
        self.routeConditions = [];

        /* Public methods */
        self.addRouteCondition = addRouteCondition;
        self.newRouteConditionName = newRouteConditionName;
        self.addRule = addRule;
        self.updateRuleList = updateRuleList;

        function newRouteConditionName(value) {
            if (value !== undefined) {
                self.routeConditionName = value;
            }

            return self.routeConditionName;
        }

        function addRouteCondition() {
            var routeCondition = AddRouteConditionEventFactory.create().execute(GROUP_NAME_SUFIX, self.route);
            var routeConditionWidget = {
                name: routeCondition.name,
                rules: []
            };
            self.routeConditions.push(routeConditionWidget);
        }

        function addRule(ruleWidget) {
            self.routeConditions[0].rules.push(ruleWidget);
        }

        function updateRuleList(widget) {
            var ruleToRemove = self.routeConditions[0].rules.filter(function(ruleWidget) {
                return ruleWidget.uuid === widget.uuid;
            });

            var indexToRemove = self.routeConditions[0].rules.indexOf(ruleToRemove[0]);
            if (indexToRemove > -1) self.routeConditions[0].rules.splice(indexToRemove, 1);
            return ruleToRemove[0];
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMiscItem', directive);

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
        'TemplateLoaderService',
        'SurveyItemSettingsContentService'
    ];

    function SurveyItemSettingsController($scope, $element, TemplateLoaderService, SurveyItemSettingsContentService) {
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

        /* Public methods */
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.navigationButton = navigationButton;

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
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRouteCreator', otusRouteCreator);

    otusRouteCreator.$inject = ['RouteCreatorWidgetFactory'];

    function otusRouteCreator(RouteCreatorWidgetFactory) {
        var ddo = {
            scope: {
                flex: '@',
                leftIcon: '@',
                layout: '@'
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/route/creator/route-creator.html',
            link: function link(scope, element, attr, controller) {
                scope.widget = RouteCreatorWidgetFactory.create(attr, element, scope.$parent.widget);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteCreatorWidgetFactory', RouteCreatorWidgetFactory);

    RouteCreatorWidgetFactory.$inject = [
        'AddRouteEventFactory',
        'RouteEditorWidgetFactory'
    ];

    function RouteCreatorWidgetFactory(AddRouteEventFactory, RouteEditorWidgetFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, element, parentWidget) {
            return new RouteCreatorWidget(templateData, element, parentWidget, AddRouteEventFactory, RouteEditorWidgetFactory);
        }

        return self;
    }

    function RouteCreatorWidget(templateData, element, parentWidget, AddRouteEventFactory, RouteEditorWidgetFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.template = {};
        self.css = {};
        self.css.ngClass = {};
        self.element = element;

        /* Instance definitions */
        self.parent = parentWidget;
        self.routeData = {};
        self.routeData.parentNavigation = parentWidget.navigation;

        /* Template definitions */
        self.template.flex = templateData.flex;
        self.template.icon = 'low_priority';
        self.template.layout = templateData.layout;

        /* CSS definitions */
        self.css.class = templateData.class;
        self.css.ngClass.open = false;

        /* Public methods */
        self.routeDestination = routeDestination;
        self.createRoute = createRoute;

        self.parent.routeCreatorWidget = self;

        function routeDestination(value) {
            if (value !== undefined)
                self.routeData.destination = value;

            return self.routeData.destination;
        }

        function createRoute() {
            self.routeData.name = self.parent.getRouteName();
            var route = AddRouteEventFactory.create().execute(self.routeData);
            self.parent.addRoute(route);

            self.element.find('input').val('');
            self.element.find('input').blur();
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRouteEditor', otusRouteEditor);

    function otusRouteEditor() {
        var ddo = {
            scope: {
                leftIcon: '@',
                widget: '='
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/route/editor/route-editor.html'
        };

        return ddo;
    }

}());

 (function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteEditorWidgetFactory', RouteEditorWidgetFactory);

    RouteEditorWidgetFactory.$inject = [
        '$mdDialog',
        'RemoveRouteEventFactory',
        'UpdateRouteEventFactory'
    ];

    function RouteEditorWidgetFactory($mdDialog, RemoveRouteEventFactory, UpdateRouteEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(route, parentWidget) {
            return new RouteEditorWidget(route, parentWidget, $mdDialog, RemoveRouteEventFactory, UpdateRouteEventFactory);
        }

        return self;
    }

    function RouteEditorWidget(route, parentWidget, $mdDialog, RemoveRouteEventFactory, UpdateRouteEventFactory) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;
        self.css = {};
        self.css.ngClass = {};
        self.template = {};

        /* Template definitions */
        

        /* CSS definitions */
        self.css.ngClass.isSimpleRoute = route.isSimple || true;

        /* Instance definitions */
        self.parent = parentWidget;
        self.routeData = route;
        self.routeData.parentNavigation = parentWidget.navigation;

        /* Public methods */
        self.editRoute = editRoute;
        self.removeRoute = removeRoute;
        self.name = name;
        self.destination = destination;

        /* Actions */
        function editRoute() {
            self.dialogSettings = {
                parent: angular.element(document.body),
                templateUrl: 'app/editor/ui/navigation/route-condition/route-condition-dialog.html',
                openFrom: '#system-toolbar',
                controller: function controller() {
                    var vm = this;
                    vm.currentRoute = self.routeData;

                    vm.close = function close() {
                        $mdDialog.hide();
                    };
                },
                controllerAs: 'routeConditionDialog',
                clickOutsideToClose: true,
                fullscreen: true,
                closeTo: {
                    bottom: 0
                }
            };
            $mdDialog.show(self.dialogSettings);
        }

        function removeRoute() {
            RemoveRouteEventFactory.create().execute(self.routeData);
            self.parent.removeRoute(self.routeData.name);
        }

        /* Getters and setters */
        function name(value) {
            if (value !== undefined) {
                self.routeData.name = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.routeData.name;
        }

        function destination(value) {
            if (value !== undefined) {
                self.routeData.destination = value;
                UpdateRouteEventFactory.create().execute(self);
            }

            return self.routeData.destination;
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRuleCreator', otusRuleCreator);

    otusRuleCreator.$inject = ['RuleCreatorWidgetFactory'];

    function otusRuleCreator(RuleCreatorWidgetFactory) {
        var ddo = {
            scope: {
                leftIcon: '@'
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/rule/creator/rule-creator.html',
            link: function link(scope, element, attr, controller) {
                scope.widget = RuleCreatorWidgetFactory.create(scope, scope.$parent.widget);
            }
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RuleCreatorWidgetFactory', RuleCreatorWidgetFactory);

    RuleCreatorWidgetFactory.$inject = [
        'AddRuleEventFactory',
        'RuleEditorWidgetFactory',
        'WorkspaceService'
    ];

    function RuleCreatorWidgetFactory(AddRuleEventFactory, RuleEditorWidgetFactory, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, parentWidget) {
            return new RuleCreatorWidget(scope, parentWidget, AddRuleEventFactory, RuleEditorWidgetFactory, WorkspaceService);
        }

        return self;
    }

    function RuleCreatorWidget(scope, parentWidget, AddRuleEventFactory, RuleEditorWidgetFactory, WorkspaceService) {
        var self = this;

        /* Type definitions */
        self.name = 'RuleCreator';

        /* Instance definitions */
        self.newRule = {};
        self.parent = parentWidget;
        self.route = parentWidget.route;
        self.survey = WorkspaceService.getSurvey();

        /* User definitions */
        self.icon = 'low_priority';

        /* Public interface */
        self.avaiableQuestions = avaiableQuestions;
        self.when = when;
        self.operator = operator;
        self.answer = answer;
        self.saveRule = saveRule;

        /* View data interface */
        function avaiableQuestions() {
            return Object.keys(self.survey.questionContainer);
        }

        function when(value) {
            if (value !== undefined)
                self.newRule.when = value;

            return self.newRule.when;
        }

        function operator(value) {
            if (value !== undefined)
                self.newRule.operator = value;

            return self.newRule.operator;
        }

        function answer(value) {
            if (value !== undefined)
                self.newRule.answer = value;

            return self.newRule.answer;
        }

        function saveRule() {
            var newRule = AddRuleEventFactory.create().execute(self.newRule, self.route);
            var ruleEditorWidget = RuleEditorWidgetFactory.create(newRule, self.parent);
            self.parent.addRule(ruleEditorWidget);

            self.newRule = {};
        }

    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRuleEditor', otusRuleEditor);

    function otusRuleEditor() {
        var ddo = {
            scope: {
                leftIcon: '@',
                widget: '='
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/rule/editor/rule-editor.html'
        };

        return ddo;
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RuleEditorWidgetFactory', RuleEditorWidgetFactory);

    RuleEditorWidgetFactory.$inject = [
        'RemoveRuleEventFactory',
        'UUID'
    ];

    function RuleEditorWidgetFactory(RemoveRuleEventFactory, UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(rule, parentWidget) {
            return new RuleEditorWidget(rule, parentWidget, RemoveRuleEventFactory, UUID);
        }

        return self;
    }

    function RuleEditorWidget(rule, parentWidget, RemoveRuleEventFactory, UUID) {
        var self = this;

        /* Type definitions */
        self.className = self.constructor.name;

        /* Instance definitions */
        self.uuid = UUID.generateUUID();
        self.parent = parentWidget;
        self.route = parentWidget.route;
        self.rule = rule;
        self.newRuleGroup = {};
        self.ruleGroups = [];

        /* Public methods */
        self.when = when;
        self.operator = operator;
        self.answer = answer;
        self.removeRule = removeRule;

        function when(value) {
            if (value !== undefined) {
                self.rule.when = value;
            }

            return self.rule.when;
        }

        function operator(value) {
            if (value !== undefined) {
                self.rule.operator = value;
            }

            return self.rule.operator;
        }

        function answer(value) {
            if (value !== undefined) {
                self.rule.answer = value;
            }

            return self.rule.answer;
        }

        function removeRule() {
            RemoveRuleEventFactory.create().execute(self.rule, self.route);
            // self.route.conditionSet[0].removeRule(self.rule);
            self.parent.updateRuleList(self);
        }
    }

}());

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
        .directive('otusCalendarQuestion', directive);

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
            return '<otus-calendar-question></otus-calendar-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusCheckboxQuestion', otusCheckboxQuestion);

    otusCheckboxQuestion.$inject = [
        'CheckboxQuestionWidgetFactory'
    ];

    function otusCheckboxQuestion(CheckboxQuestionWidgetFactory) {
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
        'AnswerOptionWidgetFactory',
        'AddAnswerOptionEventFactory',
        'RemoveAnswerOptionEventFactory',
    ];

    function CheckboxQuestionWidgetFactory(AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new CheckboxQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory);
        }

        return self;
    }

    function CheckboxQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        self.options = [];

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

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
            return '<otus-checkbox-question></otus-checkbox-question>';
        }

        function addOption() {
            var newOption = AddAnswerOptionEventFactory.create().execute(self);
            var optionWidget = AnswerOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function removeLastOption() {
            RemoveAnswerOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusDecimalQuestion', directive);

    function directive() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/decimal/decimal-question.html',
            restrict: 'E'
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
            return '<otus-decimal-question></otus-decimal-question>';
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
                    var shiftKey = (keycode === 16);
                    var backspaceKey = (keycode === 8);
                    var homeKey = (keycode === 36);
                    var endKey = (keycode === 35);
                    var deleteKey = (keycode === 46);
                    var controlKey = (keycode === 17);
                    // var cKey = (keycode === 67);
                    // var vKey = (keycode === 86);
                    var leftKey = (keycode === 37);
                    var rightKey = (keycode === 39);

                    return (minusKey || commaKey || dotKey || shiftKey || backspaceKey || homeKey || endKey || deleteKey || controlKey || leftKey || rightKey);
                }
            }
        };
    });
}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusEmailQuestion', directive);

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
            return '<otus-email-question></otus-email-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusIntegerQuestion', directive);

    function directive() {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/integer/integer-question.html',
            retrict: 'E'
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
            return '<otus-integer-question></otus-integer-question>';
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
                    // var cKey = (keycode === 67);
                    // var vKey = (keycode === 86);
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
        .directive('otusPhoneQuestion', directive);

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
            return '<otus-phone-question></otus-phone-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusTextQuestion', directive);

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
            return '<otus-text-question></otus-text-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusTimeQuestion', directive);

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
            return '<otus-time-question></otus-time-question>';
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSingleSelectionQuestion', directive);

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
        'AnswerOptionWidgetFactory',
        'AddAnswerOptionEventFactory',
        'RemoveAnswerOptionEventFactory',
    ];

    function SingleSelectionQuestionWidgetFactory(AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new SingleSelectionQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory);
        }

        return self;
    }

    function SingleSelectionQuestionWidget(scope, element, AnswerOptionWidgetFactory, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory) {
        var self = this;

        self.options = [];

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.getTemplate = getTemplate;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

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
            return '<otus-single-selection-question></otus-single-selection-question>';
        }

        function addOption() {
            var newOption = AddAnswerOptionEventFactory.create().execute(self);
            var optionWidget = AnswerOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function removeLastOption() {
            RemoveAnswerOptionEventFactory.create().execute(self);
            self.options.splice(-1);
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
