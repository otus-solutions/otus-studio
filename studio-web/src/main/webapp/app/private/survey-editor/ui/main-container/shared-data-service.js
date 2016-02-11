(function() {

    angular
        .module('editor.ui')
        .service('SharedDataService', SharedDataService);

    /*
     *    This service is used only for share the variable
     *    binding between differents instances of the ContainerController
     */
    function SharedDataService() {
        return {
            binding: ''
        };
    }

}());
