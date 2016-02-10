(function() {

    angular
        .module('protocolSpecification')
        .factory('CheckboxQuestionFactory', CheckboxQuestionFactory);

    CheckboxQuestionFactory.$inject = ['LabelFactory'];

    function CheckboxQuestionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.crate = create;

        function create() {
            return new CheckboxQuestion(LabelFactory);
        }

        return self;
    }

    function CheckboxQuestion(LabelFactory) {
        this.extends = 'Question';
        this.objectType = 'CheckboxQuestion';
        this.dataType = 'Boolean';
        this.oid = '';
        this.labels = [LabelFactory.create()];

        this.getLabel = function getLabel(index) {
            return this.labels[index];
        };
    }

}());
