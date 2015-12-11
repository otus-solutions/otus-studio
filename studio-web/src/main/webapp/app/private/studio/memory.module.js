(function() {

    var module = angular.module('memory', []);

    module.service('MemoryService', ['MemoryCache',
        function(MemoryCache) {
            var self = this;
            var memoryCache = new MemoryCache();

            /* Public interface */
            self.storeState = storeState;
            self.getMostRecentState = getMostRecentState;

            /* Public interface implementation */
            function storeState(state) {
                memoryCache.storeState(state);
            }

            function getMostRecentState() {
                return memoryCache.getMostRecentState();
            }
        }
    ]);

    module.factory('MemoryCache', [function() {
        return function() {
            var stateStack = [];

            this.storeState = function storeState(state) {
                stateStack.push(state);
            };

            this.isFull = function isFull() {
                return (stateStack.length <= 10);
            };

            this.clear = function clear() {
                stateStack = [];
            };

            this.getMostRecentState = function getMostRecentState() {
                return stateStack[stateStack.length - 1];
            };
        };
    }]);

}());
