(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('VmService', VmService);

    VmService.$inject = ['EditorEngineService'];

    function VmService(EditorEngineService) {
    }

}());
