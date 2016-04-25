(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusStage', otusStage);

    function otusStage() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'app/editor/ui/stage/stage.html'
        };

        return ddo;
    }

}());
