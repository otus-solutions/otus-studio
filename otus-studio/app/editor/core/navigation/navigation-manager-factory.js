(function() {
    'use strict';

    angular
        .module('editor.navigation')
        .factory('NavigationManagerFactory', NavigationManagerFactory);

    NavigationManagerFactory.$inject = [
        'NavigationFactory'
    ];

    function NavigationManagerFactory(NavigationFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new NavigationManager(NavigationFactory);
        }

        return self;
    }

    function NavigationManager(NavigationFactory) {
        var self = this;
        var navigationList = [];

        /* Public interface */
        self.updateNavigation = updateNavigation;
        self.getNavigationByOrigin = getNavigationByOrigin;
        self.getNavigationList = getNavigationList;
        self.getNavigationListSize = getNavigationListSize;
        self.createNavigationTo = createNavigationTo;
        self.removeNavigationOf = removeNavigationOf;
        self.removeNavigationByIndex = removeNavigationByIndex;
        self.removeLastNavigation = removeLastNavigation;
        self.existsNavigationTo = existsNavigationTo;

        function updateNavigation(update) {
            update.setManager(self);
            update.execute();
        }

        function getNavigationList() {
            return navigationList;
        }

        function getNavigationListSize() {
            return navigationList.length;
        }

        function createNavigationTo(questionID) {
            navigationList.push(NavigationFactory.create(questionID));
        }

        function removeNavigationOf(questionID) {
            var navigationToRemove = navigationList.filter(function(navigation) {
                return findByOrigin(navigation, questionID);
            });

            var indexToRemove = navigationList.indexOf(navigationToRemove[0]);
            if (indexToRemove > -1) navigationList.splice(indexToRemove, 1);

            return indexToRemove;
        }

        function removeNavigationByIndex(indexToRemove) {
            navigationList.splice(indexToRemove, 1);
        }

        function removeLastNavigation(indexToRemove) {
            navigationList.splice(-1, 1);
        }

        function getNavigationByOrigin(origin) {
            var filter = navigationList.filter(function(navigation) {
                return findByOrigin(navigation, origin);
            });

            return filter[0];
        }

        function existsNavigationTo(origin) {
            return (getNavigationByOrigin(origin)) ? true : false;
        }

        /* Private methods */
        function findByOrigin(navigation, questionID) {
            return navigation.origin === questionID;
        }

    }

}());
