(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusInputText', otusInputText);

    otusInputText.$inject = ['editor.ui.mpath'];

    function otusInputText(mpath) {
        var ddo = {
            scope: {
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/core/widget/base/input-text/input-text.html',
            controller: 'OtusInputTextController',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
            }
        };

        return ddo;
    }

}());
