(function() {

    angular
        .module('memory')
        .factory('MemoryManagement', MemoryManagement);

    MemoryManagement.$inject = ['MemoryCache'];

    function MemoryManagement(MemoryCache) {
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
        };
    }

}());
