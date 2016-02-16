(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionPaletteController', QuestionPaletteController);

    function QuestionPaletteController() {
        var self = this;
        self.isOpened = false;

        /* Public interface */
        self.changeState = changeState;

        /* Public interface implemenation */
        function changeState() {
            self.isOpened = !self.isOpened;
        }
    }

}());
