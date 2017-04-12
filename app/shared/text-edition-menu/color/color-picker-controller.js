(function() {
    'use strict';

    angular
        .module('otus.textEdition')
        .controller('otus.textEdition.ColorController', controller);

    controller.$inject = ['otus.textEdition.ColorContext', '$mdDialog'];

    function controller(ColorContext, $mdDialog) {
        var self = this;
        self.select = select;
        self.cancel = cancel;

        _init();

        function _init() {
            self.currentBackgroundColor = ColorContext.backgroundColor;
            self.currentTextColor = ColorContext.textColor;
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function select() {
            ColorContext.backgroundColor = self.currentBackgroundColor;
            ColorContext.textColor = self.currentTextColor;
            $mdDialog.hide();
        }
    }

}());
