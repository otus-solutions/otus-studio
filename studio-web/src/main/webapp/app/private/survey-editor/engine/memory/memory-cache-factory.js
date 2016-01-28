(function() {

    angular
        .module('memory')
        .factory('MemoryCache', MemoryCache);

    function MemoryCache() {
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
    }

}());
