(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRemoveButton', otusRemoveButton);

    function otusRemoveButton() {
        var ddo = {
            scope: {
                class: '@',
                label: '@',
                ariaLabel: '@',
                icon: '@',
                leftIcon: '@',
                ngModel: '@',
                context: '=',
                model: '='
            },
            transclude: true,
            templateUrl: 'app/editor/ui/base/remove-button/remove-button.html',
            controller: 'OtusRemoveButtonController',
            retrict: 'E'
        };

        return ddo;
    }

}());
