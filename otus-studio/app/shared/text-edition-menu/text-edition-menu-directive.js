(function() {
    'use strict';

    angular
        .module('ui.components')
        .directive('textEditionMenu', textEditionMenu);

    function textEditionMenu() {
        var ddo = {
            templateUrl: 'app/shared/text-edition-menu/text-edition-menu-template.html',
            retrict: 'E',
            link: linkFunc
        };

        return ddo;
    }

    function linkFunc(scope, element, attrs) {
        scope.bold = bold;
        scope.italic = italic;
        scope.underlined = underlined;
        scope.strikeThrough = strikeThrough;

        function bold() {
            document.execCommand('bold', false, null);
            return false;
        }

        function italic() {
            document.execCommand('italic', false, null);
            return false;
        }

        function underlined() {
            document.execCommand('underline', false, null);
            return false;
        }

        function strikeThrough() {
            document.execCommand('strikeThrough', false, null);
            return false;
        }
    }
}());
