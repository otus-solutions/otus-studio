(function() {

    angular
        .module('protocolSpecification')
        .factory('TextQuestionFactory', ['Label', TextQuestionFactory]);

    function TextQuestionFactory(Label) {
        return function TextQuestion() {
            this.extends = 'Question';
            this.objectType = 'TextQuestion';
            this.dataType = 'String';
            this.oid = '';
            this.labels = [new Label()];

            this.getLabel = function getLabel(index) {
                return this.labels[index];
            };
        };
    }

}());
