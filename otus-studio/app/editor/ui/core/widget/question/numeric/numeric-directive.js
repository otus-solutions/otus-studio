(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('numericQuestion', numericQuestion);

    numericQuestion.$inject = ['editor.ui.mpath'];

    function numericQuestion(mpath) {
        var ddo = {
            scope: {},
            templateUrl: mpath.getWidgetPath('numeric'),
            retrict: 'E'
        };

        return ddo;
    }

}());
