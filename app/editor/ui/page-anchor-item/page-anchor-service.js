(function() {
    angular
        .module('editor.ui')
        .service('PageAnchorService', PageAnchorService);

    function PageAnchorService() {
        var self = this;
        var anchorList = {};

        // public interface
        self.sheetAutoFocus = sheetAutoFocus;
        self.anchorRegistry = anchorRegistry;


        function anchorRegistry(anchorElement) {
            anchorList[anchorElement[0].id] = anchorElement;
        }

        function sheetAutoFocus(sheet) {
            var childrenNb = sheet.children().length;
            if (childrenNb > 6) {
                _focusOnBottom();
            } else {
                _focusOnTop();
            }
        }

        function _focusOnTop() {
            if (anchorList['top-anchor']) {
                anchorList['top-anchor'].focus();
            }
        }

        function _focusOnBottom() {
            if (anchorList['bottom-anchor']) {
                anchorList['bottom-anchor'].focus();
            }
        }
    }

}());
