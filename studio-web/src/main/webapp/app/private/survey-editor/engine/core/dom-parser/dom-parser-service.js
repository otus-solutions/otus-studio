(function() {

    angular
        .module('editor.engine.core')
        .service('DomParser', DomParser);

    DomParser.$inject = ['InputTextParser'];

    function DomParser(InputTextParser) {
        var self = this;

        var parserMap = {
            'input-text': InputTextParser
        };

        /* Public interface */
        self.parse = parse;

        function parse(editingSource) {
            var parser = parserMap[editingSource.type];
            return parser.parse(editingSource.component);
        }
    }

}());
