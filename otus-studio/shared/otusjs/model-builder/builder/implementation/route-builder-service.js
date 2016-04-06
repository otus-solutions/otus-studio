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
            } else if (work.type.isPreUpdateData()) {
                route = updateRoute(work);
            }

            if (isDataProcessComplete()) {
                nameWasProccessed = false;
                destinationWasProccessed = false;
                notifyObservers(route, work.type);
            }
        }

        function addRoute(work) {
            var navigation = work.survey.listNavigation(work.context);
            var newRoute = RouteFactory.create(navigation.getOrigin(), null, work.survey.listNavigations().length - 1);

            navigation.addRoute(newRoute);

            return newRoute;
        }

        function updateRoute(work) {
            var index = work.target.match(/\d/g)[0];
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
