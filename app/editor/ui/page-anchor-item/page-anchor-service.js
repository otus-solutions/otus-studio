(function() {
    angular
        .module('editor.ui')
        .service('PageAnchorService', PageAnchorService);

    PageAnchorService.$inject = [];

    function PageAnchorService(element) {
        var self = this;
        self.focusOnElement = focusOnElement;

        function focusOnElement(element) {
            var childrenNb = element.offsetParent().children().length;
            var bottomAnchor = angular.element(document.querySelector('#page-anchor'));
            element.attr('tabindex', -1);

            if (childrenNb > 6) {
                bottomAnchor.focus();
            } else {
                element.focus();
            }
        }
    }

}());
