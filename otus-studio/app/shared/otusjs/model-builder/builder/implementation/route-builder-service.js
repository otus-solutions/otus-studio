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
                currentRouteIndex = route.getIndex();

                if (isDataProcessComplete()) {
                    nameWasProccessed = false;
                    destinationWasProccessed = false;
                    route.setIndex(currentRouteIndex);
                    notifyObservers(route, work.type);
                }
            } else if (work.type.isPreUpdateData()) {
                route = updateRoute(work);

                if (isDataProcessComplete()) {
                    nameWasProccessed = false;
                    destinationWasProccessed = false;
                    route.setIndex(currentRouteIndex);
                    notifyObservers(route, work.type);
                }
            } else if (work.type.isUpdateData()) {
                console.log('update data');
            } else if (work.type.isRemoveData()) {
                route = removeRoute(work);
                notifyObservers(route, work.type);
            }
        }

        function addRoute(work) {
            var navigation = work.survey.listNavigation(work.context);
            var newRoute = RouteFactory.create(navigation.getOrigin(), null, navigation.listRoutes().length);

            navigation.addRoute(newRoute);

            return newRoute;
        }

        function updateRoute(work) {
            var index = work.target.match(/\d/g)[1];
            var routes = work.survey.listNavigation(work.context).listRoutes();
            var routeToUpdate = routes[index];

            if (work.target.search('name') != -1) {
                routeToUpdate.setName(work.data.value);
                nameWasProccessed = true;
            } else {
                routeToUpdate.setDestination(work.data.value);
                destinationWasProccessed = true;
            }

            return routeToUpdate;
        }

        function removeRoute(work) {
            var navigation = work.target.match(/\d/g)[0];
            var routeName = work.target.split('.')[3];
            var routeToRemove = work.survey.navigationList[navigation].removeRoute(routeName);
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
