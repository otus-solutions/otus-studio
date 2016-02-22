(function() {

    angular
        .module('editor.engine.memory.ui')
        .service('MemoryUIService', MemoryUIService);

    function MemoryUIService() {
        var self = this;

        /* Public interface */
        self.prompt = prompt;

        function prompt(data) {
            console.log(data);
        }
    }

}());
