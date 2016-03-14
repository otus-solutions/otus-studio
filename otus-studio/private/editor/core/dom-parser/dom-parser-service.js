(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('DomParser', DomParser);

    DomParser.$inject = ['InputTextParser', 'DivEditableParser'];

    function DomParser(InputTextParser, DivEditableParser) {
        var self = this;

        var parserMap = {
            'input-text': InputTextParser,
            'div-editable': DivEditableParser
        };

        /* Public interface */
        self.parse = parse;

        function parse(editingSource) {
            var parser = parserMap[editingSource.type];

            if (parser) {
                return parser.parse(editingSource.component);
            }

            return null;
        }
    }

}());
