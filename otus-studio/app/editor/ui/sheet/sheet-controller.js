(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SheetController', SheetController);

    SheetController.$inject = [
        '$scope',
        '$element',
        'SheetContentService'
    ];

    function SheetController($scope, $element, SheetContentService) {
        var self = this;
        SheetContentService.init($scope, $element);
    }

}());
