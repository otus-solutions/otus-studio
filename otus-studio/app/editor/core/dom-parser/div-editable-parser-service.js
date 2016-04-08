(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('DivEditableParser', DivEditableParser);

    function DivEditableParser() {
        var self = this;

        /* Public interface */
        self.parse = parse;

        function parse(domComponent) {
            var jqElement = angular.element(domComponent);
            return new ParseResult(jqElement);
        }
    }

    function ParseResult(domComponent) {
        var self = this;

        self.id = domComponent.attr('id');
        self.name = domComponent.attr('name');
        self.plainText = domComponent.text();
        self.formattedText = domComponent.html();
    }

}());
