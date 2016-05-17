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
        self.addNavigation = addNavigation;
        self.removeNavigation = removeNavigation;

        function init() {
            NavigationContainerService.getNavigationList();
        }

        function getNavigationList() {
            NavigationContainerService.getNavigationList();
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
