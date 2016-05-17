(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .service('NavigationContainerService', NavigationContainerService);

    NavigationContainerService.$inject = ['NavigationFactory'];

    function NavigationContainerService(NavigationFactory) {
        var self = this;
        var navigation = []; // TODO: To implement Immutable collection

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
            navigation = [];
        }

        function manageNavigation(navigationToManage) {
            navigation = navigationToManage;
        }

        function getNavigationList() {
            return navigation;
        }

        function getNavigationListSize() {
            return navigation.length;
        }

        function getNavigationByOrigin(origin) {
            var filter = navigation.filter(function(navigation) {
                return findByOrigin(navigation, origin);
            });

            return filter[0];
        }

        function existsNavigationTo(origin) {
            return (getNavigationByOrigin(origin)) ? true : false;
        }

        function createNavigationTo(questionID) {
            navigation.push(NavigationFactory.create(questionID));
        }

        function removeNavigationOf(questionID) {
            var navigationToRemove = navigation.filter(function(navigation) {
                return findByOrigin(navigation, questionID);
            });

            var indexToRemove = navigation.indexOf(navigationToRemove[0]);
            if (indexToRemove > -1) navigation.splice(indexToRemove, 1);
        }

        function removeNavigationByIndex(indexToRemove) {
            navigation.splice(indexToRemove, 1);
        }

        function removeCurrentLastNavigation(indexToRemove) {
            navigation.splice(-1, 1);
        }

        /* Private methods */
        function findByOrigin(navigation, questionID) {
            return navigation.origin === questionID;
        }
    }

}());
