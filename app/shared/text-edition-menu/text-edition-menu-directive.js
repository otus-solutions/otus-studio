(function() {
    'use strict';

    angular
        .module('otus.textEdition')
        .directive('otusTextEditionMenu', directive);

    function directive() {
        var ddo = {
            templateUrl: 'app/shared/text-edition-menu/text-edition-menu-template.html',
            retrict: 'E',
            controller: 'otus.textEdition.TextEditionMenuController as controller'
        };

        return ddo;
    }
}());
