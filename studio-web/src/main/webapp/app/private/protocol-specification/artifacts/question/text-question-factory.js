(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .factory('TextQuestionFactory', TextQuestionFactory);

    TextQuestionFactory.$inject = ['LabelFactory'];

    function TextQuestionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new TextQuestion(LabelFactory);
        }

        return self;
    }

    function TextQuestion(Label) {
        this.extends = 'Question';
        this.objectType = 'TextQuestion';
        this.dataType = 'String';
        this.oid = '';
        this.labels = [LabelFactory.create()];

        this.getLabel = function getLabel(index) {
            return this.labels[index];
        };
    }

}());
