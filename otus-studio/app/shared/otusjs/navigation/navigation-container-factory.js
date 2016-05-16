(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .factory('NavigationManagerFactory', NavigationManagerFactory);

    function NavigationManagerFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new NavigationManager();
        }

        return self;
    }

    function NavigationManager() {
        var self = this;
        var navigationList = [];

        /* Public methods */
        self.getNavigationByOrigin = getNavigationByOrigin;
        self.getNavigationList = getNavigationList;
        self.getNavigationListSize = getNavigationListSize;
        self.existsNavigationTo = existsNavigationTo;
        self.createNavigationTo = createNavigationTo;
        self.removeNavigationOf = removeNavigationOf;
        self.removeNavigationByIndex = removeNavigationByIndex;
        self.removeLastNavigation = removeLastNavigation;

        function getNavigationList() {
            return navigationList;
        }

        function getNavigationListSize() {
            return navigationList.length;
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

        /* Private methods */
        function findByOrigin(navigation, questionID) {
            return navigation.origin === questionID;
        }

    }

}());
