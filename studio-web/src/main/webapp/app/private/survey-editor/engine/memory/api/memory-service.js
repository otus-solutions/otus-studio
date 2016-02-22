(function() {

    angular
        .module('editor.engine.memory')
        .service('MemoryService', MemoryService);

    MemoryService.$inject = ['UIMemoryService', 'MDbService'];

    function MemoryService(UIMemoryService, MDbService) {
        var self = this;

        /* Public interface */
        self.storeData = storeData;

        function storeData(data) {
            UIMemoryService.storeData(data);
            MDbService.storeData(data);
        }
    }

}());
