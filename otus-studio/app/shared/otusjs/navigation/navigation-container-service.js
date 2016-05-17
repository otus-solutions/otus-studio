(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .service('NavigationContainerService', NavigationContainerService);

    NavigationContainerService.$inject = ['NavigationFactory'];

    function NavigationContainerService(NavigationFactory) {
        var self = this;
        var navigationList = []; // TODO: To implement Immutable collection

        /* Public methods */
        self.init = init;
        self.manageNavigation = manageNavigation;
        self.getNavigationByOrigin = getNavigationByOrigin;
        self.getNavigationList = getNavigationList;
        self.getNavigationListSize = getNavigationListSize;
        self.existsNavigationTo = existsNavigationTo;
        self.createNavigationTo = createNavigationTo;
        self.removeNavigationOf = removeNavigationOf;
        self.removeNavigationByIndex = removeNavigationByIndex;
        self.removeCurrentLastNavigation = removeCurrentLastNavigation;

        function init() {
            navigationList = [];
        }

        function manageNavigation(navigationToManage) {
            navigationList = navigationToManage;
        }

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

        function createNavigationTo(origin, destination) {
            navigationList.push(NavigationFactory.create(origin, destination));
        }

        function removeNavigationOf(questionID) {
            var navigationToRemove = navigationList.filter(function(navigation) {
                return findByOrigin(navigation, questionID);
            });

            var indexToRemove = navigationList.indexOf(navigationToRemove[0]);
            if (indexToRemove > -1) navigationList.splice(indexToRemove, 1);
        }

        function removeNavigationByIndex(indexToRemove) {
            navigationList.splice(indexToRemove, 1);
        }

        function removeCurrentLastNavigation(indexToRemove) {
            navigationList.splice(-1, 1);
        }

        /* Private methods */
        function findByOrigin(navigation, questionID) {
            return navigation.origin === questionID;
        }
    }

}());
