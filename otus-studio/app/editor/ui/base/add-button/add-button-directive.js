(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusAddButton', otusAddButton);

    function otusAddButton() {
        var ddo = {
            scope: {
                class: '@',
                label: '@',
                tooltip: '@',
                ariaLabel: '@',
                leftIcon: '@',
                icon: '@',
                ngModel: '@',
                context: '='
            },
            templateUrl: 'app/editor/ui/base/add-button/add-button.html',
            controller: 'OtusAddButtonController',
            retrict: 'E'
        };

        return ddo;
    }

}());
