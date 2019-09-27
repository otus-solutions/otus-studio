(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .directive('otusToolbar', otusToolbar);

    function otusToolbar() {
        var ddo = {
            templateUrl: 'app/dashboard/menu/toolbar/menu-toolbar.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
