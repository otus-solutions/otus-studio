(function() {

    angular
        .module('protocolSpecification')
        .factory('LabelFactory', ['LabelContent', LabelFactory]);

    function LabelFactory(LabelContent) {
        return function Label() {
            this.extends = 'StudioObject';
            this.objectType = 'Label';
            this.oid = '';
            this.content = [new LabelContent()];

            this.getContent = function getContent(index) {
                return this.content[index];
            };
        };
    }

}());
