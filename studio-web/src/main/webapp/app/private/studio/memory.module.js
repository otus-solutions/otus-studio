(function() {

    var module = angular.module('memory', []);

    module.factory('MemoryManagement', ['MemoryCache', function (MemoryCache) {
        return function(memoryCacheSize) {
            if (!memoryCacheSize || memoryCacheSize < 0) memoryCacheSize = 10;
            var memoryCache = new MemoryCache(memoryCacheSize);

            /* Public interface implementation */
            this.storeState = function storeState(state) {
                memoryCache.storeState(state);
            };
            this.getMostRecentState = function getMostRecentState() {
                return memoryCache.getMostRecentState();
            };
            this.get = function get() {
                return memoryCache.getStack();
            };
        }
    }]);

    module.factory('MemoryCache', [function() {
        return function(size) {
            var stateStack = [],
                maxSize = size;

            this.storeState = function storeState(state) {
                if (this.isFull()) {
                    stateStack.shift(stateStack[0]);
                }
                stateStack.push(state);
            };
            this.isFull = function isFull() {
                return (stateStack.length == maxSize);
            };
            this.clear = function clear() {
                stateStack = [];
            };
            this.getMostRecentState = function getMostRecentState() {
                return stateStack[stateStack.length - 1];
            };
            this.getStack = function getStack() {
                return stateStack;
            };
        };
    }]);

}());
