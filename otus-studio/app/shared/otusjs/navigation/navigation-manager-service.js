(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .service('NavigationManagerService', NavigationManagerService);

    NavigationManagerService.$inject = [
        'NavigationContainerService',
        'NavigationAddFactory',
        'NavigationRemoveFactory'
    ];

    function NavigationManagerService(NavigationContainerService, NavigationAddFactory, NavigationRemoveFactory) {
        var self = this;

        /* Public interface */
        self.init = init;
        self.getNavigationList = getNavigationList;
        self.getNavigationByOrigin = getNavigationByOrigin;
        self.addNavigation = addNavigation;
        self.removeNavigation = removeNavigation;

        function init() {
            NavigationContainerService.init();
        }

        function getNavigationList() {
            return NavigationContainerService.getNavigationList();
        }

        function getNavigationByOrigin(origin) {
            return NavigationContainerService.getNavigationByOrigin(origin);
        }

        function addNavigation(questionContainer) {
            var update = NavigationAddFactory.create(questionContainer);
            update.execute();
        }

        function removeNavigation(templateID) {
            var update = NavigationRemoveFactory.create(templateID);
            update.execute();
        }
    }

}());
