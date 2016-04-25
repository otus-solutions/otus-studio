(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('integerQuestion', integerQuestion);

    integerQuestion.$inject = ['editor.ui.mpath'];

    function integerQuestion(mpath) {
        var ddo = {
            templateUrl: mpath.getWidgetPath('integer'),
            retrict: 'E'
        };

        return ddo;
    }

}());
