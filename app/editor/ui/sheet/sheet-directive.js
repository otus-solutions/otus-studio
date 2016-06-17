(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSheet', otusSheet);

    function otusSheet() {
        var ddo = {
            restrict: 'E',
            controller: 'SheetController',
            templateUrl: 'app/editor/ui/sheet/sheet.html'
        };

        return ddo;
    }

}());
