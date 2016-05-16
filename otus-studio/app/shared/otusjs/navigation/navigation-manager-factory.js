(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .service('NavigationManagerService', NavigationManagerService);

    NavigationManagerService.$inject = [
        'NavigationAddFactory',
        'NavigationRemoveFactory'
    ];

    function NavigationManagerService(NavigationAddFactory, NavigationRemoveFactory) {
        var self = this;
        var navigationList = [];

        /* Public interface */
        self.addNavigation = addNavigation;
        self.removeNavigation = removeNavigation;

        function addNavigation(questionContainer) {
            var update = NavigationAddFactory.create(questionContainer);
            update.execute();
        }

        function removeNavigation(question) {
            var update = NavigationRemoveFactory.create(question);
            update.execute();
        }
    }

}());
