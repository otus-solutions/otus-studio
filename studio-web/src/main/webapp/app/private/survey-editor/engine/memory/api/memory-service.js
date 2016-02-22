(function() {

    angular
        .module('editor.engine.memory')
        .service('MemoryService', MemoryService);

    MemoryService.$inject = ['UIMemoryService', 'MDbService'];

    function MemoryService(UIMemoryService, MDbService) {
        var self = this;

        /* Public interface */
        self.store = store;

        function store(data) {
            UIMemoryService.storeData(data);
            MDbService.storeData(data);
        }
    }

}());
