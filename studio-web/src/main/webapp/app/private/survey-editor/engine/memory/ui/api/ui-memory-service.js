(function() {

    angular
        .module('editor.engine.memory.ui')
        .service('UIMemoryService', UIMemoryService);

    UIMemoryService.$inject = ['LiveCacheFactory'];

    function UIMemoryService(LiveCacheFactory) {
        var self = this;

        /* Public interface */
        self.prompt = prompt;

        function prompt(data) {
            console.log(data);
        }
    }

}());
