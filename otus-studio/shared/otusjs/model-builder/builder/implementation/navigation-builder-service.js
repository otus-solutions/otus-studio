(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('NavigationBuilderService', NavigationBuilderService);

    NavigationBuilderService.$inject = ['RouteFactory'];

    function NavigationBuilderService(RouteFactory) {
        var self = this;
        var workResult = null;
        var observers = [];

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

            if (route.origin && route.destination) {
                notifyObservers(route, work.type);
            }
        }

        function addRoute(work) {
            var navigation = work.survey.listNavigation(work.context);
            var newRoute = RouteFactory.create(navigation.origin, null, work.survey.listNavigations().length - 1);

            navigation.addRoute(newRoute);

            return newRoute;
        }

        function updateRoute(work) {
            var route = work.survey.listNavigation(work.context).listRoutes()[index];
            return route;
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
    }

}());
