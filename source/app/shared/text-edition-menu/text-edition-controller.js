(function() {
    'use strict';

    angular
        .module('otus.textEdition')
        .controller('otus.textEdition.TextEditionMenuController', controller);

    controller.$inject = ['$scope', '$mdDialog', 'otus.textEdition.ColorContext'];

    function controller($scope, $mdDialog, ColorContext) {
        var self = this;

        self.bold = bold;
        self.italic = italic;
        self.underlined = underlined;
        self.strikeThrough = strikeThrough;
        self.openColors = openColors;
        self.foreColor = foreColor;
        self.hiliteColor = hiliteColor;
        self.justifyCenter = justifyCenter;
        self.justifyLeft = justifyLeft;
        self.justifyRight = justifyRight;
        self.justifyFull = justifyFull;
        self.removeFormat = removeFormat;

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

        function foreColor() {
            var textColor = ColorContext.textColor;
            document.execCommand('ForeColor', false, textColor);
            return false;
        }

        function hiliteColor() {
            var backgroundColor = ColorContext.backgroundColor;
            document.execCommand('HiliteColor', false, backgroundColor);
            return false;
        }

        function justifyCenter() {
            document.execCommand('justifyCenter', false, null);
            return false;
        }

        function justifyFull() {
            document.execCommand('justifyFull', false, null);
            return false;
        }

        function justifyLeft() {
            document.execCommand('justifyLeft', false, null);
            return false;
        }

        function justifyRight() {
            document.execCommand('justifyRight', false, null);
            return false;
        }

        function removeFormat() {
            document.execCommand('removeFormat', false, null);
            return false;
        }

        function openColors() {
            $mdDialog.show({
                templateUrl: 'app/shared/text-edition-menu/color/color-picker-template.html',
                controller: 'otus.textEdition.ColorController as controller',
                clickOutsideToClose: true
            });
        }
    }

}());
