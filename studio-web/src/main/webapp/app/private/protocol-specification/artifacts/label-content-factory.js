(function() {

    angular
        .module('protocolSpecification')
        .factory('LabelContentFactory', LabelContentFactory);

    function LabelContentFactory() {
        return function LabelContent() {
            this.extends = 'StudioObject';
            this.objectType = 'LabelContent';
            this.oid = '';
            this.locale = 'pt_BR';
            this.text = '';
        };
    }

}());
