(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('MainContainerContentService', MainContainerContentService);

    // MainContainerContentService.$inject = ['WorkspaceService'];

    function MainContainerContentService() {
        var self = this,
            observers = [];

        /* Public interface */
        self.showWidget = showWidget;
        self.registerObserver = registerObserver;

        function showWidget() {
            notifyObservers(true);
        }

        function registerObserver(observer) {
            var registered = observers.filter(function (o) {
                if (o.identifier === observer.identifier) {
                    return o;
                }
            });

            if (registered.length === 0)
                observers.push(observer);
        }

        function notifyObservers(question) {
            observers.forEach(function(observer) {
                observer.update(question);
            });
        }
    }

}());
