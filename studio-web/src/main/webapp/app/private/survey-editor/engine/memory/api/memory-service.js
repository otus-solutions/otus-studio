(function() {

    angular
        .module('editor.engine.memory')
        .service('MemoryService', MemoryService);

    MemoryService.$inject = ['UIMemoryService', 'LiveCacheService', 'MDbService'];

    function MemoryService(UIMemoryService, LiveCacheService, MDbService) {
        var self = this;

        /* Public interface */
        self.getLiveCache = getLiveCache;
        self.store = store;

        function store(data) {
            UIMemoryService.storeData(data);
            MDbService.storeData(data);
        }

        function getLiveCache() {
            return LiveCacheService;
        }
    }

}());
