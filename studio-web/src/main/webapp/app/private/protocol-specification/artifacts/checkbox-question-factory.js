(function() {

    angular
        .module('protocolSpecification')
        .factory('CheckboxQuestionFactory', ['Label', CheckboxQuestionFactory]);

    function CheckboxQuestionFactory(Label) {
        return function CheckboxQuestion() {
            this.extends = 'Question';
            this.objectType = 'CheckboxQuestion';
            this.dataType = 'Boolean';
            this.oid = '';
            this.labels = [new Label()];

            this.getLabel = function getLabel(index) {
                return this.labels[index];
            };
        };
    }

}());
