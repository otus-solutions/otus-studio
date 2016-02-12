(function() {

    angular
        .module('editor.engine.ui')
        .service('UIDataService', UIDataService);

    /*
     * This service is used only for share the variable
     * binding between differents instances of the ContainerController
     */
    function UIDataService() {
        return {
            binding: ''
        };
    }

}());
