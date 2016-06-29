(function() {
    angular
        .module('editor.ui')
        .service('PageAnchorService', PageAnchorService);

    PageAnchorService.$inject = [
        'WorkspaceService',
        '$timeout'
    ];

    function PageAnchorService(WorkspaceService, $timeout) {
        var self = this;
        var childrenNb;
        var bottomAnchor;
        // public interface
        self.focusOnElement = focusOnElement;

        _init();

        function _init() {
            bottomAnchor = angular.element(document.querySelector('#page-anchor'));
        }

        function focusOnElement(sheet) {
            childrenNb = sheet.children().length;
            if (childrenNb > 6) {
                bottomAnchor.focus();
            } else {
                var domElement = sheet[0].lastChild;
                domElement.focus();
            }
        }

        function _getElementByID(templateID) {
            focusId = '#' + templateID;
            return document.querySelector(focusId);
        }
    }

}());
