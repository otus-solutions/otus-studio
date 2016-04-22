(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('RouteBuilderService', RouteBuilderService);

    RouteBuilderService.$inject = ['RouteFactory'];

    function RouteBuilderService(RouteFactory) {
        var self = this;
        var workResult = null;
        var observers = [];
        var nameWasProccessed = false;
        var destinationWasProccessed = false;
        var currentRouteIndex;

        /* Public interface */
        self.runValidations = runValidations;
        self.execute = execute;
        self.getWorkResult = getWorkResult;

        /* Observable interface */
        self.registerObserver = registerObserver;

        // TODO: Implement validator to run here
        function runValidations(work) {
            workResult = true;
        }

        function getWorkResult() {
            return {
                result: workResult
            };
        }

        function execute(work) {
            var route = null;

            if (work.type.isPreAddData()) {
                route = addRoute(work);

                if (isDataProcessComplete()) {
                    nameWasProccessed = false;
                    destinationWasProccessed = false;
                    notifyObservers(route, work.type);
                }
            } else if (work.type.isPreUpdateData()) {
                route = preUpdateRoute(work);

                if (isDataProcessComplete()) {
                    nameWasProccessed = false;
                    destinationWasProccessed = false;
                    notifyObservers(route, work.type);
                }
            } else if (work.type.isUpdateData()) {
                route = updateRoute(work);
                notifyObservers(route, work.type);
            } else if (work.type.isRemoveData()) {
                route = removeRoute(work);
                notifyObservers(route, work.type);
            }
        }

        function addRoute(work) {
            var navigation = work.survey.listNavigation(work.context);
            var newRoute = RouteFactory.create(navigation.origin, null, navigation.listRoutes().length);

            navigation.addRoute(newRoute);

            return newRoute;
        }

        function preUpdateRoute(work) {
            var routes = getCurrentRoutes(work);
            var routeToUpdate = routes[routes.length - 1];

            return applyUpdate(work, routeToUpdate);
        }

        function updateRoute(work) {
            var routes = getCurrentRoutes(work);
            var routeToUpdate = routes[parseInt(work.target.match(/\d/g)[1])];

            return applyUpdate(work, routeToUpdate);
        }

        function getCurrentRoutes(work) {
            return work.survey.listNavigationByIndex(parseInt(work.target.match(/\d/g)[0])).listRoutes();
        }

        function applyUpdate(work, routeToUpdate) {
            if (work.target.search('name') != -1) {
                routeToUpdate.name = work.data.value;
                nameWasProccessed = true;
            } else {
                routeToUpdate.destination = work.data.value;
                destinationWasProccessed = true;
            }

            var navigation = work.survey.listNavigation(work.context);
            navigation.updateRoute(routeToUpdate);

            return routeToUpdate;
        }

        function removeRoute(work) {
            var navigation = work.target.match(/\d/g)[0];
            var routeIndex = work.target.split('.')[3];
            var routeToRemove = work.survey.navigationList[navigation].removeRoute(routeIndex);
            work.type.dataModel = 'Route';
            return routeToRemove;
        }

        function notifyObservers(route, work) {
            work.data = route;
            observers.forEach(function(observer) {
                observer.update(work);
            });
        }

        function registerObserver(observer) {
            var registered = observers.filter(function(o) {
                if (o.identifier === observer.identifier) {
                    return o;
                }
            });

            if (registered.length === 0)
                observers.push(observer);
        }

        function isDataProcessComplete() {
            return nameWasProccessed && destinationWasProccessed;
        }
    }

}());
