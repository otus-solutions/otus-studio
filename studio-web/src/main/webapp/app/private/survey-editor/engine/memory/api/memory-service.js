(function() {

    angular
        .module('editor.engine.memory')
        .service('MemoryService', MemoryService);

    MemoryService.$inject = ['UIMemoryService'];

    function MemoryService(UIMemoryService) {
        var self = this;

        /* Public interface */
        self.storeData = storeData;

        function storeData(data) {
            UIMemoryService.prompt(data);
        }
    }

}());
