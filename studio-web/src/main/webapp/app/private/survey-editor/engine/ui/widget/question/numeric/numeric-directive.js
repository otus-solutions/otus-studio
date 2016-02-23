(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .directive('numericQuestion', numericQuestion);

    numericQuestion.$inject = ['editor.engine.ui.mpath'];

    function numericQuestion(mpath) {
        var ddo = {
            templateUrl: mpath.getWidgetPath('numeric'),
            retrict: 'E'
        };

        return ddo;
    }

}());
